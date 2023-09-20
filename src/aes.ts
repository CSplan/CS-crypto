import { crypto } from './internal/globals.js'
import { AES_KEY_LENGTH, Formats, Algorithms, Hashes } from './constants.js'
import { encode, decode } from './base64.js'
import { binaryConcat } from './binary.js'
import { makeSalt } from './random.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as rsa from './rsa.js'

const messages = {
	badCipher: 'an unsupported AES cipher was requested, only AES-GCM and AES-CBC are supported',
	badData: 'data provided is not of type object, array, or stringlike'
} as const

/**
 * Advanced options for {@link importKeyMaterial} and {@link unwrapKey}
 */ 
export type ImportKeyMaterialOpts = {
	/** Supported key usages {@defaultValue ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']}*/
	keyUsages?: KeyUsage[]
	/** Whether the key can be exported via {@link rsa.wrapKey} {@defaultValue false}*/
	extractable?: boolean
}

/**
 * Import an AES key from raw key material
 */
export function importKeyMaterial(keyMaterial: Uint8Array, type: Algorithms.AES_GCM|Algorithms.AES_CBC, opts?: ImportKeyMaterialOpts): PromiseLike<CryptoKey> {
	return crypto.subtle.importKey(
		Formats.Raw,
		keyMaterial,
		type,
		opts?.extractable !== undefined ? opts.extractable : false,
		opts?.keyUsages !== undefined ? opts.keyUsages : ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']
	)
}

/**
 * Generate a new 256 bit AES-GCM or AES-CBC key
 */
export function generateKey(type: 'AES-GCM'|'AES-CBC'): Promise<CryptoKey> {
	return crypto.subtle.generateKey(
		{
			name: type,
			length: AES_KEY_LENGTH
		},
		true,
		['encrypt', 'decrypt']
	)
}

function genIV(key: CryptoKey): Uint8Array {
	const ivLength = getIVlength(key)
	return makeSalt(ivLength)
}

/**
 * Encrypt text using AES-GCM or AES-CBC
 */
export async function encrypt(text: string, key: CryptoKey): Promise<string> {
	if (text.length === 0) {
		return ''
	}

	const iv = genIV(key)

	// Encrypt the text
	const plainbuf = new TextEncoder().encode(text)
	const encrypted = new Uint8Array(await crypto.subtle.encrypt(
		{
			name: key.algorithm.name,
			iv
		},
		key,
		plainbuf
	))

	// Concatenate the iv to the encrypted data and encode to base64
	return encode(binaryConcat(iv, encrypted))
}

/**
 * @internal
 * Find the recommended iv length based on a key's aes algorithm
 */
function getIVlength(key: CryptoKey): number {
	switch (key.algorithm.name) {
	case 'AES-GCM':
		return 12
	case 'AES-CBC':
		return 16
	default:
		throw new Error(messages.badCipher)
	}
}

/**
 * Decrypt text that was previously encrypted using the same AES key
 */
export async function decrypt(ciphertext: string, key: CryptoKey): Promise<string> {
	if (ciphertext.length === 0) {
		return ''
	}

	const ivLength = getIVlength(key)
	// Split iv and real ciphertext from the buffer using the iv length
	const cipherbuf = decode(ciphertext)
	const iv = cipherbuf.slice(0, ivLength)
	const encrypted = cipherbuf.slice(ivLength)

	const decrypted = await crypto.subtle.decrypt(
		{
			name: key.algorithm.name,
			iv
		},
		key,
		encrypted
	)

	// Decode the plaintext as utf-8
	return new TextDecoder('UTF-8').decode(decrypted)
}

/**
 * Any data that is valid for encryption
 */
export type StringLike = {
  toString(): string
}

/**
 * Encrypt a Uint8Array
 */
export async function binaryEncrypt(plaintext: Uint8Array, key: CryptoKey): Promise<Uint8Array> {
	const iv = genIV(key)
	const encrypted = new Uint8Array(await crypto.subtle.encrypt(
		{
			name: key.algorithm.name,
			iv
		},
		key,
		plaintext
	))

	return binaryConcat(iv, encrypted)
}

/**
 * Decrypt a Uint8Array
 */
export async function binaryDecrypt(ciphertext: Uint8Array, key: CryptoKey): Promise<Uint8Array> {
	// Separate iv and ciphertext
	const ivLength = getIVlength(key)
	const iv = ciphertext.slice(0, ivLength)
	const encrypted = ciphertext.slice(ivLength)

	return new Uint8Array(await crypto.subtle.decrypt(
		{
			name: key.algorithm.name,
			iv
		},
		key,
		encrypted
	))
}

/**
 * @deprecated - Use aes.binaryEncrypt
 * Encrypt an ArrayBuffer, used for encrypting non-text data such as images
 */
export async function ABencrypt(plainbuf: ArrayBuffer|Uint8Array, key: CryptoKey): Promise<Uint8Array> {
	return binaryEncrypt(new Uint8Array(plainbuf), key)
}

/**
 * @deprecated - Use binaryDecrypt
 * Decrypt an ArrayBuffer
 */
export async function ABdecrypt(cipherbuf: Uint8Array, key: CryptoKey): Promise<Uint8Array> {
	return binaryDecrypt(cipherbuf, key)
}

// TODO: Write Blob -> Buffer polyfill to allow testing blobDecrypt
/**
 * Decrypt an ArrayBuffer as a blob with a specified encoding
 */
export async function blobDecrypt(ciphertext: Uint8Array, key: CryptoKey, encoding: string): Promise<Blob> {
	const raw = await binaryDecrypt(ciphertext, key)
	return new Blob([raw], {
		type: encoding
	})
}

/**
 * Recursively encrypt an object or array while preserving its original structure
 */
export async function deepEncrypt<T>(data: T, cryptoKey: CryptoKey): Promise<T>
export async function deepEncrypt(data: unknown, cryptoKey: CryptoKey): Promise<unknown> {
	// Encrypt arrays while preserving their structure
	if (Array.isArray(data)) {
		const encrypted: unknown[] = []
		for (let i = 0; i < data.length; i++) {
			encrypted[i] = await deepEncrypt(data[i], cryptoKey)
		}
		return encrypted

		// Encrypt objects while preserving their structure
	} else if (typeof data === 'object') {
		const encrypted: Record<string, unknown> = {}
		for (const key in data) {
			encrypted[key] = await deepEncrypt((data as Record<string, unknown>)[key], cryptoKey)
		}
		return encrypted

		// Encrypt strings/data which can be coerced to a string using the AES key provided
	} else if (typeof (<StringLike>data).toString === 'function') {
		return encrypt((<StringLike>data).toString(), cryptoKey)

		// Any data that doesn't implement any of the above is not supported
	} else {
		throw new TypeError(messages.badData)
	}
}

/**
 * Recursively decrypt an object or array while preserving its original structure
 */
export async function deepDecrypt<T>(data: T, cryptoKey: CryptoKey): Promise<T>
export async function deepDecrypt(data: unknown, cryptoKey: CryptoKey): Promise<unknown> {
	// Decrypt arrays while preserving their structure
	if (Array.isArray(data)) {
		const decrypted: unknown[] = []
		for (let i = 0; i < data.length; i++) {
			decrypted[i] = await deepDecrypt(data[i], cryptoKey)
		}
		return decrypted

		// Decrypt objects while preserving their structures
	} else if (typeof data === 'object') {
		const decrypted: Record<string, unknown> = {}
		for (const key in data) {
			decrypted[key] = await deepDecrypt((data as Record<string, unknown>)[key], cryptoKey)
		}
		return decrypted

		// Decrypt strings
	} else if (typeof data === 'string') {
		return decrypt(data, cryptoKey)
		// Any data that doesn't implement any of the above is not supported
	} else {
		throw new TypeError(messages.badData)
	}
}

/**
 * Export an AES key using base64 encoding
 */
export async function exportKey(
	key: CryptoKey
): Promise<string> {
	const exported = await crypto.subtle.exportKey(
		Formats.Raw,
		key
	)
	return encode(new Uint8Array(exported))
}

/**
 * Wrap (encrypt) an asymmetric key using an AES key. Currently only RSA private keys are supported to be wrapped.
 *
 * @param key - Key to be encrypted
 * @param wrappingKey - AES key used to wrap {@link key}
 */
export async function wrapKey(
	key: CryptoKey,
	wrappingKey: CryptoKey
): Promise<string> {
	// Derive a secure key of the specified algorithm using the passphrase and salt
	const iv = makeSalt(12)

	// Encrypt the private key using the derived key
	const encrypted = new Uint8Array(await crypto.subtle.wrapKey(
		Formats.PKCS8,
		key,
		wrappingKey,
		{
			name: Algorithms.AES_GCM,
			iv
		}
	))

	// Prepend the iv and encode to base64
	return encode(binaryConcat(iv, encrypted))
}

/**
 * Unwrap (decrypt) an asymmetric key using an AES key. Currently only RSA private keys are supposed to be unwrapped.
 *
 * @param keyCiphertext - Ciphertext of key to be decrypted
 * @param unwrappingKey - AES key used to unwrap {@link keyCiphertext}
 * @param opts - Optional key import options
 * (note for transitioning from the deprecated `rsa.unwrapPrivateKey`: the `exportable` arg is superseded by `opts.extractable`)
 */
export async function unwrapKey(
	keyCiphertext: string,
	unwrappingKey: CryptoKey,
	opts?: ImportKeyMaterialOpts
): Promise<CryptoKey> {

	// Decode the provided information and split into iv and encrypted private key
	const decoded = decode(keyCiphertext)
	const iv = decoded.slice(0, 12)
	const encrypted = decoded.slice(12)

	return crypto.subtle.unwrapKey(
		Formats.PKCS8,
		encrypted,
		unwrappingKey,
		{
			name: Algorithms.AES_GCM,
			iv
		},
		{
			name: Algorithms.RSA,
			hash: Hashes.SHA_512
		},
		opts?.extractable !== undefined ? opts.extractable : false,
		opts?.keyUsages !== undefined ? opts.keyUsages : ['unwrapKey']
	)
}

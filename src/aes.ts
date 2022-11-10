import { crypto } from './internal/globals.js'
import { AES_KEY_LENGTH, Formats, Algorithms } from './constants.js'
import { encode, decode } from './base64.js'
import { binaryConcat } from './binary.js'
import { makeSalt } from './random.js'

const dev = process.env.NODE_ENV === 'development'
const messages = {
  unsupportedAlgorithm: 'an unsupported AES algorithm was requested, only AES-GCM and AES-CBC encryption are supported in this library',
  badData: 'data provided is not of type object, array, or stringlike'
}

/**
 * Import an AES key from raw key material
 */
export function importKeyMaterial(keyMaterial: Uint8Array, type: Algorithms.AES_GCM|Algorithms.AES_CBC): PromiseLike<CryptoKey> {
  return crypto.subtle.importKey(
    Formats.Raw,
    keyMaterial,
    type,
    false,
    ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']
  )
}

/**
 * Generate a new 256 bit AES-GCM or AES-CBC key
 */
export function generateKey(type: 'AES-GCM'|'AES-CBC'): PromiseLike<CryptoKey> {
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
      throw new Error(dev ? messages.unsupportedAlgorithm : undefined)
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
    throw new TypeError(dev ? messages.badData : undefined)
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
    throw new TypeError(dev ? messages.badData : undefined)
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

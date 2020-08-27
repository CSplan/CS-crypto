import { crypto } from './globals'
import { AES_KEY_LENGTH, PBKDF2_ITERATIONS, Formats, Algorithms, Hashes } from './constants'
import { ABconcat, ABencode, ABdecode } from './encoding'
import { makeSalt } from './random'

/**
 * Get key material from a passphrase to be used in PBKDF2
 */
function passphraseToKey(passphrase: string): PromiseLike<CryptoKey> {
  const enc = new TextEncoder()
  return crypto.subtle.importKey(
    Formats.Raw,
    enc.encode(passphrase),
    Algorithms.PBKDF2,
    false,
    ['deriveKey']
  )
}

/**
 * Derive an 256-bit AES key of a specified type from a salt and passphrase using PBKDF2
 */
export async function deriveKey(
  type: 'AES-GCM'|'AES-CBC',
  passphrase: string,
  salt: Uint8Array,
  extractable: boolean = false
): Promise<CryptoKey> {
  const baseKey = await passphraseToKey(passphrase)
  return crypto.subtle.deriveKey(
    {
      name: Algorithms.PBKDF2,
      hash: Hashes.SHA_512,
      salt: salt.buffer,
      iterations: PBKDF2_ITERATIONS
    },
    baseKey,
    {
      name: type,
      length: AES_KEY_LENGTH
    },
    extractable,
    ['wrapKey', 'unwrapKey', 'encrypt', 'decrypt']
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

/**
 * Encrypt text using AES-GCM or AES-CBC
 */
export async function encrypt(text: string, key: CryptoKey): Promise<string> {
  let iv: Uint8Array
  // Different forms of AES encryption require different iv lengths
  switch (key.algorithm.name) {
    case 'AES-GCM':
      iv = makeSalt(12)
      break
    case 'AES-CBC':
      iv = makeSalt(16)
      break
    default:
      throw new Error('Only AES-GCM and AES-CBC encryption are supported in this library. Please specify one of these algorithms to be used in the encryption process.')
  }

  // Encrypt the text
  const plainbuf = new TextEncoder().encode(text)
  const encrypted = await crypto.subtle.encrypt(
    {
      name: key.algorithm.name,
      iv
    },
    key,
    plainbuf
  )

  // Concatenate the iv to the encrypted data
  const concatenated = ABconcat(iv, encrypted)
  return ABencode(concatenated) // The key type is NOT prepended to AES-encrypted text,
  // The key type is already prepended to itself when it is wrapped for storage
}

/**
 * Decrypt text that was previously encrypted using the same AES key
 */
export async function decrypt(ciphertext: string, key: CryptoKey): Promise<string|boolean> {
  let ivLength: number
  // Different forms of AES encryption require different iv lengths
  switch (key.algorithm.name) {
    case 'AES-GCM':
      ivLength = 12
      break
    case 'AES-CBC':
      ivLength = 16
      break
    default:
      throw new Error('Only AES-GCM and AES-CBC encryption are supported in this library. Please provide a valid AES-GCM or AES-CBC key to be used in decryption.')
  }

  // Split iv and real ciphertext from the buffer using the iv length
  const cipherbuf = ABdecode(ciphertext)
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
  const plaintext = new TextDecoder('utf-8').decode(decrypted)
  // Parse decrypted booleans
  if (plaintext === 'true' || plaintext === 'false') {
    return plaintext === 'true'
  }

  // Otherwise just return the plaintext
  return plaintext
}

/**
 * Any data that is valid for encryption
 */
export type DeepEncryptable = DeepEncryptable[]|{ [index:string]: DeepEncryptable }|string|boolean
/**
 * A data structure of encrypted information
 */
export type DeepEncrypted = DeepEncrypted[]|{ [index:string]: DeepEncrypted }|string
/**
 * Alias for encryptable data, used as a return type for deepDecrypt
 */
export type DeepDecrypted = DeepEncryptable

/**
 * Recursively encrypt an object or array while preserving its original structure
 */
export async function deepEncrypt(data: DeepEncryptable, cryptoKey: CryptoKey): Promise<DeepEncrypted> {
  // Encrypt arrays while preserving their structure
  if (Array.isArray(data)) {
    const encrypted: DeepEncrypted[] = []
    for (let i = 0; i < data.length; i++) {
      encrypted[i] = await deepEncrypt(data[i], cryptoKey)
    }
    return encrypted

  // Encrypt objects while preserving their structure
  } else if (typeof data === 'object') {
    const encrypted: { [index:string]: DeepEncrypted } = {}
    for (const key in data) {
      encrypted[key] = await deepEncrypt(data[key], cryptoKey)
    }
    return encrypted

  // Encrypt strings/data which can be coerced to a string using the AES key provided
  } else if (typeof data.toString === 'function') {
    return encrypt(data.toString(), cryptoKey)

  // Any data that doesn't implement any of the above is not supported
  } else {
    throw new TypeError('Data provided is not of type object, array, or string.')
  }
}

/**
 * Recursively decrypt an object or array while preserving its original structure
 */
export async function deepDecrypt(data: DeepEncrypted, cryptoKey: CryptoKey): Promise<DeepDecrypted> {
  // Decrypt arrays while preserving their structure
  if (Array.isArray(data)) {
    const decrypted: DeepDecrypted[] = []
    for (let i = 0; i < data.length; i++) {
      decrypted[i] = await deepDecrypt(data[i], cryptoKey)
    }
    return decrypted

  // Decrypt objects while preserving their structures
  } else if (typeof data === 'object') {
    const decrypted: { [index:string]: DeepDecrypted } = {}
    for (const key in data) {
      decrypted[key] = await deepDecrypt(data[key], cryptoKey)
    }
    return decrypted

  // Decrypt strings/booleans (decrypt handles parsing of booleans)
  } else if (typeof data === 'string') {
    return decrypt(data, cryptoKey)

  // Any data that doesn't implement any of the above is not supported
  } else {
    throw new TypeError('Data provided is not of type object, array, or string.')
  }
}

export async function exportKey(
  key: CryptoKey,
  PBKDF2salt: Uint8Array
): Promise<string> {
  const exported = await crypto.subtle.exportKey(
    Formats.Raw,
    key
  )
  const concatenated = ABconcat(PBKDF2salt, exported)
  return ABencode(concatenated)
}

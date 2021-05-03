import { crypto } from './internal/globals'
import { AES_KEY_LENGTH, Formats, Algorithms } from './constants'
import { ABconcat, encode, decode } from './base64'
import { makeSalt } from './random'

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
  // Different forms of AES encryption require different iv lengths
  switch (key.algorithm.name) {
    case 'AES-GCM':
      return makeSalt(12)
    case 'AES-CBC':
      return makeSalt(16)
    default:
      throw new Error('Only AES-GCM and AES-CBC encryption are supported in this library. Please specify one of these algorithms to be used in the encryption process.')
  }
}

/**
 * Encrypt text using AES-GCM or AES-CBC
 */
export async function encrypt(text: string, key: CryptoKey): Promise<string> {
  const iv = genIV(key)

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
  return encode(concatenated)
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
  key: CryptoKey
): Promise<string> {
  const exported = await crypto.subtle.exportKey(
    Formats.Raw,
    key
  )
  return encode(new Uint8Array(exported))
}

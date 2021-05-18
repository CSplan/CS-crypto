import { crypto } from './internal/globals'
import { AES_KEY_LENGTH, Formats, Algorithms } from './constants'
import { ABconcat, encode, decode } from './base64'
import { makeSalt } from './random'

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
  // Different forms of AES encryption require different iv lengths
  switch (key.algorithm.name) {
    case 'AES-GCM':
      return makeSalt(12)
    case 'AES-CBC':
      return makeSalt(16)
    default:
      throw new Error(dev ? messages.unsupportedAlgorithm : undefined)
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
export async function decrypt(ciphertext: string, key: CryptoKey): Promise<string> {
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
      throw new Error(dev ? messages.unsupportedAlgorithm : undefined)
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
  return new TextDecoder('UTF-8').decode(decrypted)
}

/**
 * Any data that is valid for encryption
 */
export type StringLike = {
  toString(): string
}

/**
 * Recursively encrypt an object or array while preserving its original structure
 */
export async function deepEncrypt<T extends unknown>(data: T, cryptoKey: CryptoKey): Promise<T> {
  // Encrypt arrays while preserving their structure
  if (Array.isArray(data)) {
    const encrypted: unknown[] = []
    for (let i = 0; i < data.length; i++) {
      encrypted[i] = await deepEncrypt(data[i], cryptoKey)
    }
    return encrypted as T

  // Encrypt objects while preserving their structure
  } else if (typeof data === 'object') {
    const encrypted: {
      [key: string]: unknown
    } = {}
    for (const key in data) {
      encrypted[key] = await deepEncrypt(data[key], cryptoKey)
    }
    return encrypted as T

  // Encrypt strings/data which can be coerced to a string using the AES key provided
  } else if (typeof (data as StringLike).toString === 'function') {
    return encrypt((data as StringLike).toString(), cryptoKey) as Promise<T>

  // Any data that doesn't implement any of the above is not supported
  } else {
    throw new TypeError(dev ? messages.badData : undefined)
  }
}

/**
 * Recursively decrypt an object or array while preserving its original structure
 */
export async function deepDecrypt<T extends unknown>(data: T, cryptoKey: CryptoKey): Promise<T> {
  // Decrypt arrays while preserving their structure
  if (Array.isArray(data)) {
    const decrypted: unknown[] = []
    for (let i = 0; i < data.length; i++) {
      decrypted[i] = await deepDecrypt(data[i], cryptoKey)
    }
    return decrypted as T

  // Decrypt objects while preserving their structures
  } else if (typeof data === 'object') {
    const decrypted: {
      [key: string]: unknown
    } = {}
    for (const key in data) {
      decrypted[key] = await deepDecrypt(data[key], cryptoKey)
    }
    return decrypted as T

  // Decrypt strings
  } else if (typeof data === 'string') {
    return decrypt(data, cryptoKey) as T
  // Any data that doesn't implement any of the above is not supported
  } else {
    throw new TypeError(dev ? messages.badData : undefined)
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

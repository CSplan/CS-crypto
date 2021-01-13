import { deriveKey } from './aes.js'
import { Algorithms, Hashes, Formats, RSA_PUBLIC_EXPONENT } from './constants.js'
import { crypto } from './globals.js'
import { ABencode, ABconcat, ABdecode } from './encoding.js'
import { makeSalt } from './random.js'

/**
 * Generate an RSA keypair of a specified keysize
 */
export function generateKeypair(keySize: number): PromiseLike<CryptoKeyPair> {
  // @ts-ignore
  return crypto.subtle.generateKey(
    {
      name: Algorithms.RSA,
      modulusLength: keySize,
      publicExponent: RSA_PUBLIC_EXPONENT,
      hash: Hashes.SHA_512
    },
    true,
    ['wrapKey', 'unwrapKey']
  )
}

/**
 * Encrypt an RSA private key using an AES private key generated using a passphrase and salt
 */
export async function wrapPrivateKey(
  privateKey: CryptoKey,
  passphrase: string,
  PBKDF2salt: Uint8Array,
  algorithm: 'AES-GCM'|'AES-CBC'
): Promise<string> {
  // Derive a secure key of the specified algorithm using the passphrase and salt
  const tempKey = await deriveKey(algorithm, passphrase, PBKDF2salt)
  const iv = makeSalt(12)

  // Encrypt the private key using the derived key
  const encrypted = await crypto.subtle.wrapKey(
    Formats.PKCS8,
    privateKey,
    tempKey,
    {
      name: algorithm,
      iv
    }
  )
  // Concatenate the iv with the encrypted key
  const concatenated = ABconcat(iv, encrypted)

  // Encode to base64 and prepend the encryption algorithm
  return `${algorithm}:${ABencode(concatenated)}`
}

/**
 * Decrypt an RSA private key using the same passphrase and salt that were passed to wrapPrivateKey
 */
export async function unwrapPrivateKey(
  encodedPrivateKey: string,
  passphrase: string,
  PBKDF2salt: Uint8Array
): Promise<CryptoKey> {
  // Parse the algorithm from the key
  const [algorithm, concatenated] = encodedPrivateKey.split(':')
  if (!(algorithm === Algorithms.AES_GCM || algorithm === Algorithms.AES_CBC)) {
    throw new TypeError('Invalid or malformed private key encoding (unable to parse a valid decryption algorithm).')
  }

  // Recreate the same key derivation as what occured during the key's wrapping
  const tempKey = await deriveKey(algorithm, passphrase, PBKDF2salt)

  // Decode the provided information and split into iv and encrypted private key
  const decoded = ABdecode(concatenated)
  const iv = decoded.slice(0, 12)
  const encrypted = decoded.slice(12)

  return crypto.subtle.unwrapKey(
    Formats.PKCS8,
    encrypted,
    tempKey,
    {
      name: algorithm,
      iv
    },
    {
      name: Algorithms.RSA,
      hash: Hashes.SHA_512
    },
    false,
    ['unwrapKey']
  )
}

/**
 * Export an RSA public key as base64 encoded text
 */
export async function exportPublicKey(publicKey: CryptoKey): Promise<string> {
  return ABencode(await crypto.subtle.exportKey(
    Formats.SPKI,
    publicKey
  ))
}

/**
 * Import an RSA public key from base64 encoded text
 */
export function importPublicKey(encoded: string): PromiseLike<CryptoKey> {
  return crypto.subtle.importKey(
    Formats.SPKI,
    ABdecode(encoded),
    {
      name: Algorithms.RSA,
      hash: Hashes.SHA_512
    },
    true,
    ['wrapKey']
  )
}

/**
 * Wrap (encrypt) a CryptoKey using an RSA public key
 */
export async function wrapKey(
  key: CryptoKey,
  wrappingKey: CryptoKey
): Promise<string> {
  const buf = await crypto.subtle.wrapKey(
    Formats.Raw,
    key,
    wrappingKey,
    {
      name: Algorithms.RSA
    }
  )

  return `${key.algorithm.name}:${ABencode(buf)}`
}

export function unwrapKey(
  encodedKey: string,
  unwrappingKey: CryptoKey
): PromiseLike<CryptoKey> {
  const [algorithm, encoded] = encodedKey.split(':')

  return crypto.subtle.unwrapKey(
    Formats.Raw,
    ABdecode(encoded),
    unwrappingKey,
    {
      name: Algorithms.RSA // Algorithm used to unwrap the key
    },
    {
      name: algorithm // Algorithm of the key itself
    },
    true,
    ['encrypt', 'decrypt']
  )
}

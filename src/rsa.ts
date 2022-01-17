import { Algorithms, Hashes, Formats, RSA_PUBLIC_EXPONENT } from './constants'
import { crypto } from './internal/globals'
import { encode, ABconcat, decode } from './base64'
import { makeSalt } from './random'

/**
 * Generate an RSA keypair of a specified keysize
 */
export function generateKeypair(keySize: number): Promise<Required<CryptoKeyPair>> {
  return crypto.subtle.generateKey(
    {
      name: Algorithms.RSA,
      modulusLength: keySize,
      publicExponent: RSA_PUBLIC_EXPONENT,
      hash: Hashes.SHA_512
    },
    true,
    ['wrapKey', 'unwrapKey']
  ) as Promise<Required<CryptoKeyPair>>
}

/**
 * Encrypt an RSA private key using an AES private key generated using a passphrase and salt
 */
export async function wrapPrivateKey(
  privateKey: CryptoKey,
  wrappingKey: CryptoKey
): Promise<string> {
  // Derive a secure key of the specified algorithm using the passphrase and salt
  const iv = makeSalt(12)

  // Encrypt the private key using the derived key
  const encrypted = await crypto.subtle.wrapKey(
    Formats.PKCS8,
    privateKey,
    wrappingKey,
    {
      name: Algorithms.AES_GCM,
      iv
    }
  )
  // Concatenate the iv with the encrypted key
  const concatenated = ABconcat(iv, encrypted)

  // Encode to base64 and prepend the encryption algorithm
  return encode(concatenated)
}

/**
 * Decrypt an RSA key using unwrappingKey (AES-GCM)
 */
export async function unwrapPrivateKey(
  encodedPrivateKey: string,
  unwrappingKey: CryptoKey,
  exportable = false
): Promise<CryptoKey> {
  // Parse the algorithm from the key

  // Decode the provided information and split into iv and encrypted private key
  const decoded = decode(encodedPrivateKey)
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
    exportable,
    ['unwrapKey']
  )
}

/**
 * Export an RSA public key as base64 encoded text
 */
export async function exportPublicKey(publicKey: CryptoKey): Promise<string> {
  const buf = await crypto.subtle.exportKey(
    Formats.SPKI,
    publicKey
  )
  return encode(new Uint8Array(buf))
}

/**
 * Import an RSA public key from base64 encoded text
 */
export function importPublicKey(encoded: string): PromiseLike<CryptoKey> {
  return crypto.subtle.importKey(
    Formats.SPKI,
    decode(encoded),
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

  return encode(new Uint8Array(buf))
}

/**
 * Unwrap (decrypt) a CryptoKey using an RSA private key
 */
export function unwrapKey(
  encodedKey: string,
  unwrappingKey: CryptoKey,
  // Algorithm of the key to be unwrapped
  algorithm: 'AES-GCM'|'AEC-CBC' = 'AES-GCM'
): PromiseLike<CryptoKey> {
  return crypto.subtle.unwrapKey(
    Formats.Raw,
    decode(encodedKey),
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

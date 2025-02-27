import { Algorithms, Hashes, Formats, RSA_PUBLIC_EXPONENT } from './constants.js'
import { crypto } from './internal/globals.js'
import { Base64 as b64 } from './base64.js'

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
 * Export an RSA public key as base64 encoded text
 */
export async function exportPublicKey(publicKey: CryptoKey): Promise<string> {
  const buf = await crypto.subtle.exportKey(
    Formats.SPKI,
    publicKey
  )
  return b64.encode(new Uint8Array(buf))
}

/**
 * Import an RSA public key from base64 encoded text
 */
export function importPublicKey(encoded: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    Formats.SPKI,
    b64.decode(encoded),
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

  return b64.encode(new Uint8Array(buf))
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
    b64.decode(encodedKey),
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

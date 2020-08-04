import { Algorithms, Hashes, Formats, AES_KEY_LENGTH, PBKDF2_ITERATIONS, RSA_PUBLIC_EXPONENT } from '../constants'
import { crypto } from '../globals'
import { ABencode, ABconcat, ABdecode } from '../encoding'
import { makeSalt } from '../random'

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
 * Derive a temporary key of a specified type from a salt and passphrase  using PBKDF2
 */
async function deriveKey(
  type: 'AES-GCM'|'AES-CBC',
  passphrase: string,
  salt: Uint8Array
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
    false,
    ['wrapKey', 'unwrapKey']
  )
}

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
    ['wrapKey', 'unwrapKey']
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

import { crypto } from '../globals'
import { AES_KEY_LENGTH } from '../constants'
import { ABconcat, ABencode, ABdecode } from '../encoding'
import { makeSalt } from '../random/salt'

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
      throw new Error(`Only AES-GCM and AES-CBC encryption are supported in this library.
      Please specify one of these algorithms to be used in the encryption process.`)
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
      throw new Error(`Only AES-GCM and AES-CBC encryption are supported in this library.
      Please provide a valid AES-GCM or AES-CBC key to be used in decryption.`)
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
  return plaintext
}

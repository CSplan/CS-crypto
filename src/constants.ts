export const enum Algorithms {
  RSA = 'RSA-OAEP',
  AES_GCM = 'AES-GCM',
  AES_CBC = 'AES-CBC',
  PBKDF2 = 'PBKDF2'
}
export const AES_KEY_LENGTH = 256
export const PBKDF2_ITERATIONS = 110000
export const RSA_PUBLIC_EXPONENT = new Uint8Array([1, 0, 1])

export const enum Formats {
  Raw = 'raw',
  PKCS8 = 'pkcs8'
}

export const enum Hashes {
  SHA_512 = 'SHA-512'
}

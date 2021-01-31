// Algorithms is the only enum that should be compiled to js and made public,
// so it is not declared as const
export enum Algorithms {
  RSA = 'RSA-OAEP',
  AES_GCM = 'AES-GCM',
  AES_CBC = 'AES-CBC',
  PBKDF2 = 'PBKDF2'
}
export const AES_KEY_LENGTH = 256
export const RSA_PUBLIC_EXPONENT = new Uint8Array([1, 0, 1])

export const enum Formats {
  Raw = 'raw', // Used for exporting AES keys
  PKCS8 = 'pkcs8', // Used for exporting RSA private keys
  SPKI = 'spki' // Used for exporting RSA public keys
}

export const enum Hashes {
  SHA_512 = 'SHA-512'
}

import { atob, btoa } from '../globals'

/**
 * Encode an ArrayBuffer or Uint8Array to base64
 */
export function ABencode(buf: Uint8Array|ArrayBuffer): string {
  // Coerce buf to a valid byte array
  const bytes = new Uint8Array(buf)
  return btoa(String.fromCharCode.apply(null, Array.from(bytes)))
}

/**
 * Decode valid base64 as a Uint8Array
 */
export function ABdecode(encoded: string): Uint8Array {
  let raw = ''
  try {
    raw = atob(encoded)
  } catch {
    throw new Error('Unable to decode base64 input')
  }
  const bytes = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) {
    bytes[i] = raw.charCodeAt(i)
  }
  return bytes
}

/**
 * Concatenate two ArrayBuffers or Uint8Arrays
 */
export function ABconcat(
  buf1: Uint8Array|ArrayBuffer,
  buf2: Uint8Array|ArrayBuffer
): Uint8Array {
  // Coerce buf1 and buf2 into uint8 arrays
  const bytes1 = new Uint8Array(buf1)
  const bytes2 = new Uint8Array(buf2)

  // Concatenate the bytes
  const both = new Uint8Array(buf1.byteLength + buf2.byteLength)
  for (let i = 0; i < bytes1.byteLength; i++) {
    both[i] = bytes1[i]
  }
  for (let i = 0; i < bytes2.byteLength; i++) {
    both[bytes1.byteLength + i] = bytes2[i]
  }
  return both
}

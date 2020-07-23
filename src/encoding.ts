import { atob, btoa } from './globals'

/**
 * Encode an ArrayBuffer or Uint8Array to base64
 */
export function ABencode(buf: Uint8Array|ArrayBuffer): string {
  // Coerce buf to a valid byte array
  const bytes = new Uint8Array(buf)
  const nums: number[] = []
  for (let i = 0; i < buf.byteLength; i++) {
    nums[i] = bytes[i]
  }
  return btoa(String.fromCharCode.apply(null, nums))
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

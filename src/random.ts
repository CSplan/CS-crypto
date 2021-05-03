import { crypto } from './internal/globals'

/**
 * Make a salt of a specified byte length
 */
export function makeSalt(byteLength: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(byteLength))
}

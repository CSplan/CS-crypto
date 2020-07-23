import { loadPolyfill, crypto } from './globals'
import { ABencode, ABdecode } from './encoding'
import test from 'ava'

test.serial('Load polyfill', async (t) => {
  await t.notThrowsAsync(async () => {
    await loadPolyfill()
  })
})

test('Encode and decode a random array buffer', (t) => {
  const buffer = crypto.getRandomValues(new Uint8Array(16))
  const encoded = ABencode(buffer)
  const decoded = ABdecode(encoded)
  for (let i = 0; i < decoded.byteLength; i++) {
    if (decoded[i] !== buffer[i]) {
      t.fail('Decoded array buffer is not equal to original')
    }
  }
  t.pass()
})

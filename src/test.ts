import { loadPolyfill, crypto } from './globals'
import { ABencode, ABdecode } from './encoding'
import test from 'ava'
import { makeSalt } from './random/salt'
import { generateKeypair, wrapPrivateKey, unwrapPrivateKey } from './asymmetric/rsa'
import { Algorithms } from './constants'

test.serial('Load polyfill', async (t) => {
  await t.notThrowsAsync(async () => {
    await loadPolyfill()
  })
})

test('Encode and decode a random array buffer', (t) => {
  const buf = crypto.getRandomValues(new Uint8Array(16))
  const encoded = ABencode(buf)
  const decoded = ABdecode(encoded)
  t.deepEqual(decoded, buf, 'Decoded array buffer is not equal to original')
})

let salt: Uint8Array
test.serial('Generate a random salt', (t) => {
  salt = makeSalt(16)
  const emptySalt = new Uint8Array(16)
  t.notDeepEqual(salt, emptySalt)
})

let privateKey: CryptoKey
let wrappedPrivateKey: string
test.serial('Generate a random RSA keypair', async (t) => {
  await t.notThrowsAsync(async () => {
    ({ privateKey } = await generateKeypair(2048))
  })
})

test.serial('Wrap (encrypt) the RSA keypair\'s private key using AES-GCM encryption', async (t) => {
  await t.notThrowsAsync(async () => {
    wrappedPrivateKey = await wrapPrivateKey(privateKey, 'Sample Passphrase', salt, Algorithms.AES_GCM)
  })
})

test('Unwrap (decrypt) the RSA private key that was previously wrapped (encrypted)', async (t) => {
  await t.notThrowsAsync(async () => {
    await unwrapPrivateKey(wrappedPrivateKey, 'Sample Passphrase', salt)
  })
})

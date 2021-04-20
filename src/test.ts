// strip-code
import { loadPolyfill, crypto } from './globals'
import { encode, decode } from './base64'
import { makeSalt } from './random'
import { generateKeypair, wrapPrivateKey, unwrapPrivateKey, wrapKey, unwrapKey, exportPublicKey, importPublicKey } from './rsa'
import { Algorithms } from './constants'
import { generateKey, encrypt, decrypt, DeepEncryptable, DeepEncrypted, deepEncrypt, deepDecrypt, importKeyMaterial } from './aes'
import * as fs from 'fs'
import t from 'ava'
const test = t.serial // Tests are serial by default
const sampleText = 'klasdmlkasdaslkdalkdasl'

test('Load polyfill', async (t) => {
  await t.notThrowsAsync(async () => {
    await loadPolyfill()
  })
})

test('Encode and decode a random array buffer', (t) => {
  // encode and decode 10 random sequences of bytes, with a random length between 0 and 255
  for (let i = 0; i < 10; i++) {
    const buf = crypto.getRandomValues(new Uint8Array(i))
    const encoded = encode(buf)
    const decoded = decode(encoded)
    t.deepEqual(decoded, buf, 'Decoded array buffer is not equal to original')
  }
})

test('Base64 decoding ignores carriage returns', (t) => {
  const buf = crypto.getRandomValues(new Uint8Array(10))
  let encoded = encode(buf)
  // Separate each encoded char with \n
  for (let i = 0; i < encoded.length; i += 2) {
    encoded = encoded.slice(0, i) + '\n' + encoded.slice(i)
  }
  const decoded = decode(encoded)
  t.deepEqual(decoded, buf, 'Decoded buffer is not equal to original')
})

let salt: Uint8Array
test('Generate a random salt', (t) => {
  salt = makeSalt(16)
  const emptySalt = new Uint8Array(16)
  t.notDeepEqual(salt, emptySalt)
})

let publicKey: CryptoKey
let privateKey: CryptoKey
let wrappingKey: CryptoKey
let exportedPublicKey: string
let wrappedPrivateKey: string
test('Generate a random RSA keypair', async (t) => {
  await t.notThrowsAsync(async () => {
    ({ publicKey, privateKey } = await generateKeypair(2048))
  })
})

test('Export the RSA keypair\'s public key', async (t) => {
  await t.notThrowsAsync(async () => {
    exportedPublicKey = await exportPublicKey(publicKey)
    t.deepEqual(encode(decode(exportedPublicKey)), exportedPublicKey)
  })
})

test('Import the previously exported RSA public key', async (t) => {
  await t.notThrowsAsync(async () => {
    const imported = await importPublicKey(exportedPublicKey)
    t.deepEqual(imported, publicKey)
  })
})

test('Import an AES-GCM key from raw key material', async (t) => {
  await t.notThrowsAsync(async () => {
    const keyMaterial = crypto.getRandomValues(new Uint8Array(32))
    wrappingKey = await importKeyMaterial(keyMaterial, Algorithms.AES_GCM)
  })
})

test('Wrap (encrypt) the RSA keypair\'s private key using AES-GCM encryption', async (t) => {
  await t.notThrowsAsync(async () => {
    wrappedPrivateKey = await wrapPrivateKey(privateKey, wrappingKey)
  })
})

test('Unwrap (decrypt) the previously wrapped RSA private key', async (t) => {
  await t.notThrowsAsync(async () => {
    const decrypted = await unwrapPrivateKey(wrappedPrivateKey, wrappingKey)

    // Override properties that are intentionally changed or of an unpredictable order when comparing
    t.deepEqual({ ...decrypted, usages: [] }, {
      ...privateKey,
      extractable: false,
      usages: []
    })
  })
})

let key: CryptoKey
let encryptedKey: string
test('Generate a random AES-GCM key', async (t) => {
  await t.notThrowsAsync(async () => {
    key = await generateKey('AES-GCM')
    t.is(key.algorithm.name, 'AES-GCM')
  })
})

test('Wrap (encrypt) the AES-GCM key with the RSA keypair\'s public key', async (t) => {
  await t.notThrowsAsync(async () => {
    encryptedKey = await wrapKey(key, publicKey)
  })
})

test('Unwrap (decrypt) the previously wrapped AES-GCM key', async (t) => {
  await t.notThrowsAsync(async () => {
    const decrypted = await unwrapKey(encryptedKey, privateKey)
    t.deepEqual(decrypted, key)
  })
})

let encrypted: string
test('Encrypt some text using AES-GCM', async (t) => {
  await t.notThrowsAsync(async () => {
    encrypted = await encrypt(sampleText, key)
  })
})

test('Decrypt the previously encrypted text using AES-GCM', async (t) => {
  await t.notThrowsAsync(async () => {
    const decrypted = await decrypt(encrypted, key)
    t.is(decrypted, sampleText)
  })
})

let encryptable: DeepEncryptable = {
  someKey: ['some', 'cool', {
    val: 'ues'
  }]
}
let deepEncrypted: DeepEncrypted
test('Recursively encrypt an object using AES-GCM', async (t) => {
  await t.notThrowsAsync(async () => {
    deepEncrypted = await deepEncrypt(encryptable, key)
  })
})

test('Recursively decrypt the previously encrypted object using AES-GCM', async (t) => {
  await t.notThrowsAsync(async () => {
    const decrypted = await deepDecrypt(deepEncrypted, key)
    t.deepEqual(decrypted, encryptable)
  })
})

encryptable = ['some', 'more', {
  cool: 'values',
  thisIs: true,
  butThisIs: false
}]

test('Recursively encrypt an array using AES-GCM', async (t) => {
  await t.notThrowsAsync(async () => {
    deepEncrypted = await deepEncrypt(encryptable, key)
  })
})

test('Recursively decrypt the previously decrypted array using AES-GCM', async (t) => {
  await t.notThrowsAsync(async () => {
    const decrypted = await deepDecrypt(deepEncrypted, key)
    t.deepEqual(decrypted, encryptable)
  })
})

type Ptr = number
type ED25519_Exports = {
  memory: WebAssembly.Memory
  malloc: (size: number) => number
  free: (ptr: number) => void
  ed25519_keypair: (seed: Ptr, publicKey: Ptr, secretKey: Ptr) => void
  ed25519_sign: (signed: Ptr, message: Ptr, messageLen: number, privateKey: Ptr) => void
}

let ed25519: ED25519_Exports
let ed25519Seed: Uint8Array
let ed25519PrivateKey: Uint8Array
let ed25519PublicKey: Uint8Array

test('Initialize ed25519', async (t) => {
  await t.notThrowsAsync(async () => {
    const raw = fs.readFileSync('wasm/ed25519.wasm')
    const src = await WebAssembly.instantiate(raw)
    ed25519 = src.instance.exports as ED25519_Exports
  })
})

test('Deterministically derive ed25519 keys', (t) => {
  t.notThrows(() => {
    const seedLen = 32
    const privateKeyLen = 64
    const publicKeyLen = 32

    ed25519Seed = crypto.getRandomValues(new Uint8Array(32))
    const seedPtr = ed25519.malloc(seedLen)
    const seedView = new Uint8Array(ed25519.memory.buffer, seedPtr, seedLen)
    for (let i = 0; i < seedLen; i++) {
      seedView[i] = ed25519Seed[i]
    }

    const privateKeyPtr = ed25519.malloc(privateKeyLen)
    const publicKeyPtr = ed25519.malloc(publicKeyLen)

    // Run the actual derivation
    ed25519.ed25519_keypair(seedPtr, publicKeyPtr, privateKeyPtr)
    const privateKeyView = new Uint8Array(ed25519.memory.buffer, privateKeyPtr, privateKeyLen)
    const publicKeyView = new Uint8Array(ed25519.memory.buffer, publicKeyPtr, publicKeyLen)
    t.deepEqual(privateKeyView.slice(0, 32), seedView)
    t.deepEqual(privateKeyView.slice(32), publicKeyView)

    // Run the derivation again, making sure that the output is deterministic
    const privateKeyPtr2 = ed25519.malloc(privateKeyLen)
    const publicKeyPtr2 = ed25519.malloc(publicKeyLen)
    ed25519.ed25519_keypair(seedPtr, publicKeyPtr2, privateKeyPtr2)
    t.deepEqual(new Uint8Array(ed25519.memory.buffer, privateKeyPtr2, privateKeyLen), privateKeyView)
    t.deepEqual(new Uint8Array(ed25519.memory.buffer, publicKeyPtr2, publicKeyLen), publicKeyView)

    ed25519.free(seedPtr)
    ed25519.free(privateKeyPtr2)
    ed25519.free(publicKeyPtr2)

    // Store public and private keys for later
    ed25519PrivateKey = privateKeyView
    ed25519PublicKey = publicKeyView
  })
})

test('ed25519 signing', (t) => {
  t.notThrows(() => {
    // Generate a random message in WASM memory
    const messageLen = 32
    const messagePtr = ed25519.malloc(messageLen)
    const messageView = new Uint8Array(ed25519.memory.buffer, messagePtr, messageLen)
    crypto.getRandomValues(messageView)

    // Sign the message with the previously generated private key
    const signedMessageLen = 64 + messageLen
    const signedMessagePtr = ed25519.malloc(signedMessageLen)
    const privateKeyPtr = ed25519PrivateKey.byteOffset
    ed25519.ed25519_sign(signedMessagePtr, messagePtr, messageLen, privateKeyPtr)

    ed25519.free(messagePtr)
    ed25519.free(signedMessagePtr)
    ed25519.free(ed25519PrivateKey.byteOffset)
    ed25519.free(ed25519PublicKey.byteOffset)
    ed25519.free(messagePtr)
  })
})

// end-strip-code

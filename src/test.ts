import { loadPolyfill, crypto } from './internal/globals'
import { encode, decode } from './base64'
import { makeSalt } from './random'
import { generateKeypair, wrapPrivateKey, unwrapPrivateKey, wrapKey, unwrapKey, exportPublicKey, importPublicKey } from './rsa'
import { Algorithms } from './constants'
import { generateKey, encrypt, decrypt, deepEncrypt, deepDecrypt, importKeyMaterial } from './aes'
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

const encryptable1: unknown = {
  someKey: ['some', 'cool', {
    val: 'ues'
  }]
}
let deepEncrypted: unknown = {}
test('Recursively encrypt an object using AES-GCM', async (t) => {
  await t.notThrowsAsync(async () => {
    deepEncrypted = await deepEncrypt(encryptable1, key)
  })
})

test('Recursively decrypt the previously encrypted object using AES-GCM', async (t) => {
  await t.notThrowsAsync(async () => {
    const decrypted = await deepDecrypt(deepEncrypted, key)
    t.deepEqual(decrypted, encryptable1)
  })
})

type obj = {
  [key: string]: string|boolean
}

const encryptable2: Array<string|obj> = ['some', 'more', {
  cool: 'values',
  thisIs: true,
  butThisIs: false
}]

test('Recursively encrypt an array using AES-GCM', async (t) => {
  await t.notThrowsAsync(async () => {
    deepEncrypted = await deepEncrypt(encryptable2, key)
  })
})

test('Recursively decrypt the previously decrypted array using AES-GCM', async (t) => {
  await t.notThrowsAsync(async () => {
    const decrypted = await deepDecrypt(deepEncrypted, key) as typeof encryptable2
    (decrypted[2] as obj).thisIs = (decrypted[2] as obj).thisIs === 'true';
    (decrypted[2] as obj).butThisIs = (decrypted[2] as obj).thisIs === 'true'
    t.deepEqual(decrypted, encryptable2)
  })
})

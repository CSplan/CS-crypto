// strip-code
import { loadPolyfill, crypto } from './globals'
import { ABencode, ABdecode } from './encoding'
import { makeSalt } from './random'
import { generateKeypair, wrapPrivateKey, unwrapPrivateKey, wrapKey, unwrapKey, exportPublicKey, importPublicKey } from './rsa'
import { Algorithms } from './constants'
import { generateKey, encrypt, decrypt, DeepEncryptable, DeepEncrypted, deepEncrypt, deepDecrypt, deriveKey, exportKey } from './aes'
import t from 'ava'
const test = t.serial // Tests are serial by default
const passphrase = 'Sample Passphrase'
const sampleText = 'klasdmlkasdaslkdalkdasl'

test('Load polyfill', async (t) => {
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
test('Generate a random salt', (t) => {
  salt = makeSalt(16)
  const emptySalt = new Uint8Array(16)
  t.notDeepEqual(salt, emptySalt)
})

let publicKey: CryptoKey
let privateKey: CryptoKey
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
  })
})

test('Import the previously exported RSA public key', async (t) => {
  await t.notThrowsAsync(async () => {
    const imported = await importPublicKey(exportedPublicKey)
    t.deepEqual(imported, publicKey)
  })
})

test('Wrap (encrypt) the RSA keypair\'s private key using AES-GCM encryption', async (t) => {
  await t.notThrowsAsync(async () => {
    wrappedPrivateKey = await wrapPrivateKey(privateKey, passphrase, salt, Algorithms.AES_GCM)
  })
})

test('Unwrap (decrypt) the previously wrapped RSA private key', async (t) => {
  await t.notThrowsAsync(async () => {
    const decrypted = await unwrapPrivateKey(wrappedPrivateKey, passphrase, salt)

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

let PBKDF2salt: Uint8Array
let derivedKey: CryptoKey
test('Derive an AES-GCM key', async (t) => {
  await t.notThrowsAsync(async () => {
    PBKDF2salt = makeSalt(16)
    derivedKey = await deriveKey('AES-GCM', passphrase, PBKDF2salt, true)
  })
})

test('Extract the previously derived AES-GCM key', async (t) => {
  await t.notThrowsAsync(async () => {
    await exportKey(derivedKey, PBKDF2salt)
  })
})

test('Wrap (encrypt) the AES-GCM key with the RSA keypair\'s public key', async (t) => {
  await t.notThrowsAsync(async () => {
    encryptedKey = await wrapKey(key, publicKey)
    t.is(encryptedKey.split(':')[0], 'AES-GCM')
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
// end-strip-code

import 'jasmine'
import reporter from './reporter.js'
import { loadPolyfill, crypto } from '../internal/globals.js'
import { genString, makeEncryptableObj, makeEncryptableArray } from './helpers.js'

import { Base64 as b64 } from '../base64.js'
import * as binary from '../binary.js'
import * as random from '../random.js'
import * as rsa from '../rsa.js'
import * as constants from '../constants.js'
import * as aes from '../aes.js'


jasmine.getEnv().addReporter(reporter)

beforeAll(async () => {
  await loadPolyfill()
})

/** Buffer/message size used for both binary (measured in bytes) and text (measured in chars) strings */
const bufSize = 255

describe('Base64', () => {
  // Encode and decode count random sequences of bytes,
  // each with a random length [1, 255]
  const nBuf = 10
  const buf = new Uint8Array(bufSize)
  it(`Encodes and decodes ${nBuf} random byte strings`, () => {
    const view = new Uint8Array(buf.buffer, 0, Math.floor((Math.random() * bufSize)) + 1)
    crypto.getRandomValues(view)
    const encoded = b64.encode(view)
    expect(b64.decode(encoded)).toEqual(view)
  })
  it(`Encodes and decodes ${nBuf} random byte strings (no padding)`, () => {
    const view = new Uint8Array(buf.buffer, 0, Math.floor((Math.random() * bufSize)) + 1)
    crypto.getRandomValues(view)
    const encoded = b64.encode(view, b64.StdEncoding, false)
    expect(b64.decode(encoded)).toEqual(view)
  })

  // Ignore both \r and \n characters in input to base64.decode()
  it('Ignores line breaks.', () => {
    crypto.getRandomValues(buf)
    let encoded = b64.encode(buf)
    // Separate each encoded char with \n
    for (let i = 0; i < encoded.length; i += 2) {
      encoded = encoded.slice(0, i) + '\n' + encoded.slice(i)
    }
    expect(b64.decode(encoded)).toEqual(buf)
    // Separate using \r\n
    for (let i = 0; i < encoded.length; i += 3) {
      encoded = encoded.slice(0, i) + '\r' + encoded.slice(i)
    }
    expect(b64.decode(encoded)).toEqual(buf)
  })
})

describe('Binary', () => {
  // Concatenate random byte strings
  const bufSize = 255
  const nBuf = 10

  it('Concatenates random byte strings', () => {
    // Generate as a single buf then split into smaller views
    const mainBuf = crypto.getRandomValues(new Uint8Array(bufSize * nBuf))
    const views: Uint8Array[] = []
    for (let offset = 0; offset < mainBuf.byteLength; offset += bufSize) {
      views.push(new Uint8Array(mainBuf.buffer, offset, bufSize))
    }
    const concatenated = binary.binaryConcat.apply(this, views)
    expect(concatenated.byteLength).toBe(mainBuf.byteLength)
    expect(concatenated).toEqual(mainBuf)
    for (let i = 0; i < nBuf; i++) {
      const subarr = new Uint8Array(concatenated.buffer, i * bufSize, bufSize)
      expect(subarr).toEqual(views[i])
    }
  })
})

describe('Random', () => {
  const nSalt = 10
  const maxSaltLen = 255
  const allZeros = new Uint8Array(maxSaltLen).fill(0x01)
  const allOnes = new Uint8Array(maxSaltLen).fill(0x00)

  it('Generates cryptographically random salts', () => {
    // We need to precompute salt lengths to avoid setting off the spy ensuring Math.random() is not called
    const saltLengths = new Array(nSalt)
    for (let i = 0; i < saltLengths.length; i++) {
      saltLengths[i] = Math.floor(Math.random() * maxSaltLen) + 1
    }

    spyOn(crypto, 'getRandomValues').and.callThrough()
    spyOn(Math, 'random').and.callThrough()
    for (const len of saltLengths) {
      const salt = random.makeSalt(len)
      expect(salt.length).toBe(len)
      expect(salt).not.toEqual(new Uint8Array(allZeros.buffer, 0, len))
      expect(salt).not.toEqual(new Uint8Array(allOnes.buffer, 0, len))
    }
    expect(crypto.getRandomValues).toHaveBeenCalledTimes(nSalt)
    expect(Math.random).not.toHaveBeenCalled()
  })
})

describe('RSA', () => {
  const keySize = 3072

  let publicKey: CryptoKey | null
  let privateKey: CryptoKey | null
  it('Generates keypair', async () => {
    spyOn(crypto.subtle, 'generateKey').and.callThrough()
    ; ({ publicKey, privateKey } = await rsa.generateKeypair(keySize))
    expect(crypto.subtle.generateKey).toHaveBeenCalled()
    for (const key of [publicKey, privateKey]) {
      expect(key).not.toBeNull()
      expect(key.constructor.name).toBe('CryptoKey')
      expect(key.algorithm.name).toBe(constants.Algorithms.RSA)
      const algorithm = key.algorithm as RsaKeyAlgorithm
      expect(algorithm.modulusLength).toBe(3072)
      expect(algorithm.publicExponent).toEqual(constants.RSA_PUBLIC_EXPONENT)
    }
    expect(publicKey.usages).toEqual(['wrapKey'])
    expect(privateKey.usages).toEqual(['unwrapKey'])
  })

  let exportedPublicKey: string | null = null
  it('Exports public key', async () => {
    expect(publicKey).not.toBeNull(); publicKey = publicKey!

    spyOn(crypto.subtle, 'exportKey').and.callThrough()
    exportedPublicKey = await rsa.exportPublicKey(publicKey)
    expect(crypto.subtle.exportKey).toHaveBeenCalled()
    expect(exportedPublicKey).not.toBeNull()
  })
  it('Imports public key', async () => {
    expect(publicKey).not.toBeNull(); publicKey = publicKey!
    expect(exportedPublicKey).not.toBeNull(); exportedPublicKey = exportedPublicKey!

    spyOn(crypto.subtle, 'importKey').and.callThrough()
    const imported = await rsa.importPublicKey(exportedPublicKey)
    expect(crypto.subtle.importKey).toHaveBeenCalled()
    expect(imported).toEqual(publicKey)
  })

  let AESkey: CryptoKey | null = null
  let encryptedAESkey: string | null = null
  it('Wraps AES keys', async () => {
    expect(publicKey).not.toBeNull(); publicKey = publicKey!

    // Keep in mind that we aren't testing key generation here
    AESkey = await aes.generateKey('AES-GCM')
    expect(AESkey.constructor.name).toBe('CryptoKey')
    spyOn(crypto.subtle, 'wrapKey').and.callThrough()
    encryptedAESkey = await rsa.wrapKey(AESkey, publicKey)
    expect(crypto.subtle.wrapKey).toHaveBeenCalled()
    expect(encryptedAESkey).not.toBeNull()
  })
  it('Unwraps AES keys', async () => {
    expect(AESkey).not.toBeNull(); AESkey = AESkey!
    expect(encryptedAESkey).not.toBeNull(); encryptedAESkey = encryptedAESkey!
    expect(privateKey).not.toBeNull(); privateKey = privateKey!

    spyOn(crypto.subtle, 'unwrapKey').and.callThrough()
    const decryptedAESkey = await rsa.unwrapKey(encryptedAESkey, privateKey)
    expect(crypto.subtle.unwrapKey).toHaveBeenCalled()
    expect(decryptedAESkey).toEqual(AESkey)
  })
})

describe('AES', () => {
  const cipherMode = constants.Algorithms.AES_GCM

  let key: CryptoKey | null = null
  it('Generates key', async () => {
    spyOn(crypto.subtle, 'generateKey').and.callThrough()
    key = await aes.generateKey(cipherMode)
    expect(crypto.subtle.generateKey).toHaveBeenCalled()
    expect(key).not.toBeNull()
    expect(key.constructor.name).toBe('CryptoKey')
    expect(key.algorithm.name).toBe(cipherMode)
    const algorithm = key.algorithm as AesKeyAlgorithm
    expect(algorithm.length).toBe(constants.AES_KEY_LENGTH)
    expect(key.usages).toEqual(['encrypt', 'decrypt'])
  })
  let exportedKey: string | null = null
  it('Exports key', async () => {
    expect(key).not.toBeNull(); key = key!

    spyOn(crypto.subtle, 'exportKey').and.callThrough()
    exportedKey = await aes.exportKey(key)
    expect(crypto.subtle.exportKey).toHaveBeenCalled()
    expect(exportedKey).not.toBeNull()
  })
  it('Imports key material', async () => {
    expect(key).not.toBeNull(); key = key!
    expect(exportedKey).not.toBeNull(); exportedKey = exportedKey!

    spyOn(crypto.subtle, 'importKey').and.callThrough()
    const exportedKeyMaterial = b64.decode(exportedKey)
    const imported = await aes.importKeyMaterial(exportedKeyMaterial, cipherMode, {
      keyUsages: key.usages,
      extractable: key.extractable
    })
    expect(crypto.subtle.importKey).toHaveBeenCalled()
    expect(imported).toEqual(key)
  })

  const text = genString(bufSize)
  let encryptedText: string | null = null
  it('Encrypts strings', async () => {
    expect(key).not.toBeNull(); key = key!

    spyOn(crypto, 'getRandomValues').and.callThrough()
    spyOn(crypto.subtle, 'encrypt').and.callThrough()
    encryptedText = await aes.encrypt(text, key)
    expect(crypto.getRandomValues).toHaveBeenCalled()
    expect(crypto.subtle.encrypt).toHaveBeenCalled()
    expect(encryptedText).not.toBeNull()
  })
  it('Decrypts strings', async () => {
    expect(key).not.toBeNull(); key = key!
    expect(encryptedText).not.toBeNull(); encryptedText = encryptedText!

    spyOn(crypto.subtle, 'decrypt').and.callThrough()
    const decrypted = await aes.decrypt(encryptedText, key)
    expect(crypto.subtle.decrypt).toHaveBeenCalled()
    expect(decrypted).toBe(text)
  })

  const data = new Uint8Array(bufSize)
  let encryptedData: Uint8Array | null = null
  it('Encrypts binary', async () => {
    expect(key).not.toBeNull(); key = key!

    crypto.getRandomValues(data)

    spyOn(crypto, 'getRandomValues').and.callThrough()
    spyOn(crypto.subtle, 'encrypt').and.callThrough()
    encryptedData = await aes.binaryEncrypt(data, key)
    expect(crypto.getRandomValues).toHaveBeenCalled()
    expect(crypto.subtle.encrypt).toHaveBeenCalled()
    expect(encryptedData).not.toBeNull()
  })
  it('Decrypts binary', async () => {
    expect(key).not.toBeNull(); key = key!
    expect(encryptedData).not.toBeNull(); encryptedData = encryptedData!

    spyOn(crypto.subtle, 'decrypt').and.callThrough()
    const decrypted = await aes.binaryDecrypt(encryptedData, key)
    expect(crypto.subtle.decrypt).toHaveBeenCalled()
    expect(decrypted).toEqual(data)
  })


  const
    encryptableFieldCount = 10,
    encryptableFieldSize = Math.floor(bufSize / encryptableFieldCount),
    encryptableDepth = 3
  const encryptableObj = makeEncryptableObj(encryptableFieldCount, encryptableFieldSize, encryptableDepth)
  const encryptableArr = makeEncryptableArray(encryptableFieldCount, encryptableFieldSize, encryptableDepth)
  let encryptedObj: Record<string, unknown> | null = null
  let encryptedArr: unknown[] | null = null

  // Complex here refers to multiple levels of depth and multiple types of field values (Record, array, or string)
  it('Deep encrypts complex objects', async () => {
    expect(key).not.toBeNull(); key = key!

    // We're done spying on crypto.getRandomValues and crypto.subtle.encrypt
    // because deepEncrypt and deepDecrypt use encrypt/binaryEncrypt and decrypt/binaryDecrypt under the hood,
    // which have both already been tested for correct wrapping
    encryptedObj = await aes.deepEncrypt(encryptableObj, key)
    expect(encryptedObj).not.toBeNull()
  })
  it('Deep decrypts complex objects', async () => {
    expect(key).not.toBeNull(); key = key!
    expect(encryptedObj).not.toBeNull(); encryptedObj = encryptedObj!

    const decrypted = await aes.deepDecrypt(encryptedObj, key)
    expect(decrypted).toEqual(encryptableObj)
  })
  it('Deep encrypts complex arrays', async () => {
    expect(key).not.toBeNull(); key = key!

    encryptedArr = await aes.deepEncrypt(encryptableArr, key)
    expect(encryptedArr).not.toBeNull()
  })
  it('Deep decrypts complex arrays', async () => {
    expect(key).not.toBeNull(); key = key!
    expect(encryptedArr).not.toBeNull(); encryptedArr = encryptedArr!

    const decrypted = await aes.deepDecrypt(encryptedArr, key)
    expect(decrypted).toEqual(encryptableArr)
  })

  let privateKey: CryptoKey | null = null
  let encryptedPrivateKey: string | null = null
  it('Wraps RSA private keys', async () => {
    expect(key).not.toBeNull(); key = key!
    // We don't need to store the public key for this test
    ; ({ privateKey } = await rsa.generateKeypair(3072))
    expect(privateKey).not.toBeNull(); privateKey = privateKey!

    spyOn(crypto.subtle, 'wrapKey').and.callThrough()
    encryptedPrivateKey = await aes.wrapKey(privateKey, key)
    expect(crypto.subtle.wrapKey).toHaveBeenCalled()
    expect(encryptedPrivateKey).not.toBeNull()
  })
  it('Unwraps RSA private keys', async () => {
    expect(key).not.toBeNull(); key = key!
    expect(privateKey).not.toBeNull(); privateKey = privateKey!
    expect(encryptedPrivateKey).not.toBeNull(); encryptedPrivateKey = encryptedPrivateKey!

    spyOn(crypto.subtle, 'unwrapKey').and.callThrough()
    const decrypted = await aes.unwrapKey(encryptedPrivateKey, key, {
      keyUsages: privateKey.usages,
      extractable: privateKey.extractable
    })
    expect(crypto.subtle.unwrapKey).toHaveBeenCalled()
    expect(decrypted).toEqual(privateKey)
  })
})

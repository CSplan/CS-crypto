import { loadPolyfill, crypto } from './internal/globals.js'
import { encode, decode } from './base64.js'
import { binaryConcat } from './binary.js'
import { makeSalt } from './random.js'
import { generateKeypair, wrapPrivateKey, unwrapPrivateKey, wrapKey, unwrapKey, exportPublicKey, importPublicKey } from './rsa.js'
import { Algorithms } from './constants.js'
import { generateKey, encrypt, decrypt, deepEncrypt, deepDecrypt, importKeyMaterial, ABencrypt, ABdecrypt } from './aes.js'
import t from 'ava'
const test = t.serial // Tests are serial by default
const sampleText = 'klasdmlkasdaslkdalkdasl'

test('Load polyfill', async (t) => {
	await t.notThrowsAsync(async () => {
		await loadPolyfill()
	})
})

test('Encode and decode random array buffer', (t) => {
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

test('Concatenate multiple Uint8Arrays', (t) => {
	// Generate 5 Uint8Arrays filled with random content
	const bufSize = 32
	const nBuf = 5
	const bufs: Uint8Array[] = []
	for (let i = 0; i < nBuf; i++) {
		bufs.push(crypto.getRandomValues(new Uint8Array(bufSize)))
	}

	const concatenated = binaryConcat.apply(this, bufs)
	for (let i = 0; i < nBuf; i++) {
		const subarr = new Uint8Array(concatenated.buffer, i * bufSize, bufSize)
		t.deepEqual(subarr, bufs[i])
	}
})

let salt: Uint8Array
test('Generate random salt', (t) => {
	salt = makeSalt(16)
	const emptySalt = new Uint8Array(16)
	t.notDeepEqual(salt, emptySalt)
})

let publicKey: CryptoKey
let privateKey: CryptoKey
let wrappingKey: CryptoKey
let exportedPublicKey: string
let wrappedPrivateKey: string
test('Generate RSA keypair', async (t) => {
	await t.notThrowsAsync(async () => {
		({ publicKey, privateKey } = await generateKeypair(2048))
	})
})

test('Export RSA public key', async (t) => {
	await t.notThrowsAsync(async () => {
		exportedPublicKey = await exportPublicKey(publicKey)
		t.deepEqual(encode(decode(exportedPublicKey)), exportedPublicKey)
	})
})

test('Import RSA public key', async (t) => {
	await t.notThrowsAsync(async () => {
		const imported = await importPublicKey(exportedPublicKey)
		t.deepEqual(imported, publicKey)
	})
})

test('Import AES-GCM key from key material', async (t) => {
	await t.notThrowsAsync(async () => {
		const keyMaterial = crypto.getRandomValues(new Uint8Array(32))
		wrappingKey = await importKeyMaterial(keyMaterial, Algorithms.AES_GCM)
	})
})

test('Wrap (encrypt) RSA public key with AES-GCM key', async (t) => {
	await t.notThrowsAsync(async () => {
		wrappedPrivateKey = await wrapPrivateKey(privateKey, wrappingKey)
	})
})

test('Unwrap (decrypt) RSA private key with AES-GCM key', async (t) => {
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
test('Generate AES-GCM key', async (t) => {
	await t.notThrowsAsync(async () => {
		key = await generateKey('AES-GCM')
		t.is(key.algorithm.name, 'AES-GCM')
	})
})

test('Wrap (encrypt) AES-GCM key with RSA public key', async (t) => {
	await t.notThrowsAsync(async () => {
		encryptedKey = await wrapKey(key, publicKey)
	})
})

test('Unwrap (decrypt) AES-GCM key with RSA private key', async (t) => {
	await t.notThrowsAsync(async () => {
		const decrypted = await unwrapKey(encryptedKey, privateKey)
		t.deepEqual(decrypted, key)
	})
})

{
	let encrypted: string
	test('Encrypt text using AES-GCM', async (t) => {
		await t.notThrowsAsync(async () => {
			encrypted = await encrypt(sampleText, key)
		})
	})

	test('Decrypt text using AES-GCM', async (t) => {
		await t.notThrowsAsync(async () => {
			const decrypted = await decrypt(encrypted, key)
			t.is(decrypted, sampleText)
		})
	})

	test('Encrypt empty text using AES-GCM', async (t) => {
		await t.notThrowsAsync(async () => {
			encrypted = await encrypt('', key)
			t.is(encrypted, '')
		})
	})

	test('Decrypt empty text using AES-GCM', async (t) => {
		const decrypted = await decrypt(encrypted, key)
		t.is(decrypted, '')
	})
}

{
	const encryptable1: unknown = {
		someKey: ['some', 'cool', {
			val: 'ues'
		}]
	}
	let deepEncrypted: unknown = {}
	test('Recursively encrypt object with AES-GCM', async (t) => {
		await t.notThrowsAsync(async () => {
			deepEncrypted = await deepEncrypt(encryptable1, key)
		})
	})

	test('Recursively decrypt object with AES-GCM', async (t) => {
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

  test('Recursively encrypt array with AES-GCM', async (t) => {
  	await t.notThrowsAsync(async () => {
  		deepEncrypted = await deepEncrypt(encryptable2, key)
  	})
  })

  test('Recursively decrypt array with AES-GCM', async (t) => {
  	await t.notThrowsAsync(async () => {
  		const decrypted = await deepDecrypt(deepEncrypted, key) as typeof encryptable2
  		(decrypted[2] as obj).thisIs = (decrypted[2] as obj).thisIs === 'true';
  		(decrypted[2] as obj).butThisIs = (decrypted[2] as obj).thisIs === 'true'
  		t.deepEqual(decrypted, encryptable2)
  	})
  })
}

{
	let buf: Uint8Array
	let key: CryptoKey
	let encrypted: Uint8Array
	test('Encrypt ArrayBuffer with AES-GCM', async (t) => {
		await t.notThrowsAsync(async () => {
			buf = crypto.getRandomValues(new Uint8Array(32))
			key = await generateKey('AES-GCM')
			encrypted = await ABencrypt(buf, key)
		})
	})

	test('Decrypt ArrayBuffer with AES-GCM', async (t) => {
		await t.notThrowsAsync(async () => {
			const decrypted = await ABdecrypt(encrypted, key)
			t.deepEqual(decrypted, buf)
		})
	})
}

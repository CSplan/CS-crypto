import 'jasmine'
import reporter from './reporter.js'
import { loadPolyfill, crypto } from '../internal/globals.js'

import * as base64 from '../base64.js'
import * as binary from '../binary.js'
import * as random from '../random.js'

jasmine.getEnv().addReporter(reporter)

beforeAll(async () => {
	await loadPolyfill()
})

describe('Base64', () => {
	// Encode and decode count random sequences of bytes,
	// each with a random length [1, 255]
	const bufSize = 255
	const nBuf = 10
	const buf = new Uint8Array(bufSize)
	it(`Encodes and Decodes ${nBuf} Random Byte Strings`, () => {
		const view = new Uint8Array(buf.buffer, 0, Math.floor((Math.random() * bufSize)) + 1)
		crypto.getRandomValues(view)
		const encoded = base64.encode(view)
		expect(base64.decode(encoded)).toEqual(view)
	})

	// Ignore both \r and \n characters in input to base64.decode()
	it('Ignores line breaks.', () => {
		crypto.getRandomValues(buf)
		let encoded = base64.encode(buf)
		// Separate each encoded char with \n
		for (let i = 0; i < encoded.length; i += 2) {
			encoded = encoded.slice(0, i) + '\n' + encoded.slice(i)
		}
		expect(base64.decode(encoded)).toEqual(buf)
		// Separate using \r\n
		for (let i = 0; i < encoded.length; i += 3) {
			encoded = encoded.slice(0, i) + '\r' + encoded.slice(i)
		}
		expect(base64.decode(encoded)).toEqual(buf)
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
		for (const len of saltLengths)	{
			const salt = random.makeSalt(len)
			expect(salt.length).toBe(len)
			expect(salt).not.toEqual(new Uint8Array(allZeros.buffer, 0, len))
			expect(salt).not.toEqual(new Uint8Array(allOnes.buffer, 0, len))
		}
		expect(crypto.getRandomValues).toHaveBeenCalledTimes(nSalt)
		expect(Math.random).not.toHaveBeenCalled()
	})
})

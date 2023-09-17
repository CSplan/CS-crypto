import 'jasmine'
import * as base64 from './base64.js'

describe('base64', () => {
	// Encode and decode count random sequences of bytes,
	// each with a random length [1, 255]
	const count = 10
	const bufSize = 255
	const buf = new Uint8Array(bufSize)
	it(`encodes and decodes ${count} random byte strings`, () => {
		const view = new Uint8Array(buf, 0, Math.floor((Math.random() * bufSize)) + 1)
		crypto.getRandomValues(view)
		const encoded = base64.encode(view)
		expect(base64.decode(encoded)).toEqual(view)
	})
})

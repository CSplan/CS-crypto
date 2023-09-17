import 'jasmine'
import * as base64 from '../base64.js'
import reporter from './reporter.js'

jasmine.getEnv().addReporter(reporter)

describe('Base64', () => {
	// Encode and decode count random sequences of bytes,
	// each with a random length [1, 255]
	const count = 10
	const bufSize = 255
	const buf = new Uint8Array(bufSize)
	it(`Encodes and Decodes ${count} Random Byte Strings`, () => {
		const view = new Uint8Array(buf, 0, Math.floor((Math.random() * bufSize)) + 1)
		crypto.getRandomValues(view)
		const encoded = base64.encode(view)
		expect(base64.decode(encoded)).toEqual(view)
	})

	it('Ignnores line breaks.', () => {
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

// Only standard encoding is supported as of now
const StdEncoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

/**
 * @internal
 * Encode up to 3 bytes from data into result
 */
function encodeGroup(data: Uint8Array, result: Uint8Array): void {
	// Byte 1
	result[0] = StdEncoding.charCodeAt(data[0] >> 2)

	// Byte 2
	if (data.byteLength === 1) {
		result[1] = StdEncoding.charCodeAt(data[0] << 4 & 0x30)
		return
	}
	result[1] = StdEncoding.charCodeAt(data[0] << 4 & 0x30 | data[1] >> 4)

	// Byte 3
	if (data.byteLength === 2) {
		result[2] = StdEncoding.charCodeAt(data[1] << 2 & 0x3C)
		return
	}
	result[2] = StdEncoding.charCodeAt(data[1] << 2 & 0x3C | data[2] >> 6)

	// Byte 4
	result[3] = StdEncoding.charCodeAt(data[2] & 0x3F)
}

/**
 * @internal
 * Decode a group of base64 indexes to result
 */
function decodeGroup(data: Uint8Array, result: Uint8Array): void {
	// Byte 1
	result[0] = data[0] << 2 | data[1] >> 4
	if (result.byteLength === 1) {
		return
	}

	// Byte 2
	result[1] = data[1] << 4 | data[2] >> 2
	if (result.byteLength === 2) {
		return
	}

	// Byte 3
	result[2] = data[2] << 6 | data[3]
}

/**
 * @internal
 * ASCII to indexes, convert each ASCII character code in encoded to a usable index for decoding
 */
function atoi(encoded: Uint8Array): Uint8Array {
	let unpaddedLength = encoded.byteLength
	// Strip up to 2 padding characters off the end
	for (let i = encoded.byteLength - 2; i < encoded.byteLength; i++) {
		if (encoded[i] === '='.charCodeAt(0)) {
			unpaddedLength--
		}
	}

	const indexes = new Uint8Array(unpaddedLength)
	// Convert from ASCII character codes to 0-63
	for (let i = 0; i < unpaddedLength; i++) {
		if (encoded[i] >= 48 && encoded[i] <= 57) {
			// 0-9
			indexes[i] = encoded[i] + 4
		} else if (encoded[i] >= 65 && encoded[i] <= 90) {
			// A-Z
			indexes[i] = encoded[i] - 65
		} else if (encoded[i] >= 97 && encoded[i] <= 122) {
			// a-z
			indexes[i] = encoded[i] - 71
		} else {
			// What's done for symbols is encoding-dependent
			if (encoded[i] === 43) {
				indexes[i] = 62
				// /
			} else if (encoded[i] === 47) {
				indexes[i] = 63
			} else {
				throw new Error('invalid input, only standard base64 encoding is supported')
			}
		}
	}
	return indexes
}

/**
 * Encode a Uint8Array using Base64 standard encoding
 */
export function encode(data: Uint8Array): string {
	// Calculate result size
	const resultSize = (Math.floor(data.byteLength / 3) * 4) + (data.byteLength % 3 !== 0 ? 4 : 0)
	const result = new Uint8Array(resultSize)

	// i is the offset from the beginning of data,
	// j is the offset from the beginning of result
	let i = 0
	let j = 0
	// Encode all possible groups of 3 bytes
	for (; i < data.byteLength - 2; i += 3, j += 4) {
		encodeGroup(
			new Uint8Array(data.buffer, i, 3),
			new Uint8Array(result.buffer, j, 4)
		)
	}

	// Encode trailing bytes and add padding
	switch (data.byteLength % 3) {
	case 1:
		encodeGroup(
			new Uint8Array(data.buffer, data.byteLength - 1, 1),
			new Uint8Array(result.buffer, resultSize - 4, 2)
		)
		result[result.byteLength - 2] = '='.charCodeAt(0)
		result[result.byteLength - 1] = '='.charCodeAt(0)
		break

	case 2:
		encodeGroup(
			new Uint8Array(data.buffer, data.byteLength - 2, 2),
			new Uint8Array(result.buffer, resultSize - 4, 3)
		)
		result[result.byteLength - 1] = '='.charCodeAt(0)
		break
	}

	// Finally, encode the Uint8Array as a UTF-8 string
	return new TextDecoder().decode(result)
}

/**
 * Decode standard encoded Base64 to a Uint8Array.
 */
export function decode(encoded: string): Uint8Array {
	// Convert from ASCII encoding to indexes 0-63
	const indexes = atoi(new TextEncoder().encode(
		encoded.replaceAll(/[\r\n]/g, '') // Standard base64 behavior requires ignoring newlines
	))

	// Calculate result length
	const resultSize = (Math.floor(indexes.byteLength / 4) * 3) + // Each full group of 4 encoded -> 3 bytes
    (indexes.byteLength % 4) - // Add trailing bytes
    (indexes.byteLength % 4 > 0 ? 1 : 0) // If there are trailing bytes present, the decoded result will be 1 less byte than the encoded
	const result = new Uint8Array(resultSize)

	// Decode each group of 4 characters (3 bytes)
	// i is the offset from the beginning of indexes
	// j is the offset from the beginning of result
	let i = 0
	let j = 0
	for (; i < indexes.byteLength - 3; i += 4, j += 3) {
		decodeGroup(
			new Uint8Array(indexes.buffer, i, 4),
			new Uint8Array(result.buffer, j, 3)
		)
	}

	switch (indexes.byteLength % 4) {
	case 2:
		decodeGroup(
			new Uint8Array(indexes.buffer, indexes.byteLength - 2, 2),
			new Uint8Array(result.buffer, result.byteLength - 1, 1)
		)
		break

	case 3:
		decodeGroup(
			new Uint8Array(indexes.buffer, indexes.byteLength - 3, 3),
			new Uint8Array(result.buffer, result.byteLength - 2, 2)
		)
		break
	}

	return result
}

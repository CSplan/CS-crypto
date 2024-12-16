/** Concatenate multiple Uint8Arrays into a result buffer */
export function binaryConcat(...data: Uint8Array[]): Uint8Array {
	// Get the total size of the combined buffers
	const size = data.reduce((total, current) => {
		return total + current.byteLength
	}, 0)
	// Allocate a result array
	const result = new Uint8Array(size)
	// Append each buffer to the result
	let offset = 0 // Keep track of position within the result buffer
	for (const buf of data) {
		result.set(buf, offset)
		offset += buf.byteLength
	}
	return result
}

/** Generate a random ASCII string */
export function genString(len: number): string {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-=!@#$%^&*()_+[];,./{}:<>?'
	let out = ''
	for (let i = 0; i < len; i++) {
		out += chars[Math.floor(Math.random() * chars.length)]
	}
	return out
}

/** Generate a random encryptable Record/object. */
export function makeEncryptableObj(fieldCount: number, fieldSize: number, depth: number): Record<string, unknown> {
	const encryptable: Record<string, unknown> = {}

	for (let i = 0; i < fieldCount; i++) {
		const key = `field${i+1}`
		if (depth <= 1) {
			encryptable[key] = genString(fieldSize)
			continue
		}
		switch (i%3) {
		case 0:
			encryptable[key] = genString(fieldSize)
			break
		case 1:
			encryptable[key] = makeEncryptableArray(fieldCount, fieldSize, depth--)
			break
		case 2:
			encryptable[key] = makeEncryptableObj(fieldCount, fieldSize, depth--)
		}
	}

	return encryptable
}

/** Generate a random encryptable array */
export function makeEncryptableArray(fieldCount: number, fieldSize: number, depth: number): unknown[] {
	const valueSize = Math.floor(fieldSize/fieldCount)
	const encryptable: unknown[] = Array(fieldCount)
	for (let i = 0; i < fieldCount; i++) {
		if (depth <= 1) {
			encryptable[i] = genString(valueSize)
		} else  {
			depth--
			encryptable[i] = depth % 2 === 0
				? makeEncryptableObj(fieldCount, fieldSize, depth)
				: makeEncryptableArray(fieldCount, fieldSize, depth)
		}
	}
	return encryptable
}

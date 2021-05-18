let crypto: Crypto
if (typeof window === 'object') {
  crypto = window.crypto
}

/**
 * @internal
 */
function showDevelopmentWarning(): void {
  if (!(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')) {
    console.warn(`You have enabled a development/testing polyfill, and your environment variables indicate that you are not in a development/testing environment.
    If you're not sure what this means, you probably have made a mistake.`)
  }
}

/**
 * @internal
 * Load a polyfill for all browser globals
 */
export async function loadPolyfill(): Promise<void> {
  showDevelopmentWarning()
  const { Crypto } = await import('node-webcrypto-ossl')
  crypto = new Crypto()
}

// These exports pass value by reference.
// This means that when their value is updated from this module,
// their value is updated everywhere they're imported and used.
export {
  crypto
}

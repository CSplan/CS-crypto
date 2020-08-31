let crypto: Crypto
let atob = function(data: string): string { return data }
let btoa = function(data: string): string { return data }
if (typeof window === 'object') {
  ({ crypto, atob, btoa } = window)
}

function strip_code(): void {} // eslint-disable-line
function end_strip_code(): void {} // eslint-disable-line

strip_code()
function showDevelopmentWarning(): void {
  if (!(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')) {
    console.warn(`You have enabled a development/testing polyfill, and your environment variables indicate that you are not in a development/testing environment.
    If you're not sure what this means, you probably have made a mistake.`)
  }
}
end_strip_code()

/**
 * Load a polyfill for all browser globals
 */
export async function loadPolyfill(): Promise<void> {
  strip_code()
  showDevelopmentWarning();
  // @ts-ignore
  ({ atob, btoa } = await import('Base64'))
  const { Crypto } = await import('node-webcrypto-ossl')
  crypto = new Crypto()
  end_strip_code()
}

// These exports pass value by reference.
// This means that when their value is updated from this module,
// their value is updated everywhere they're imported and used.
export {
  crypto,
  atob,
  btoa
}

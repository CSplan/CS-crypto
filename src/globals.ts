let crypto: Crypto
let atob = function(data: string): string { return '' }
let btoa = function(data: string): string { return '' }
if (typeof window === 'object') {
  ({ crypto, atob, btoa } = window)
}

function showDevelopmentWarning(): void {
  if (!(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')) {
    console.warn(`You have enabled a development/testing polyfill, and your environment variables indicate that you are not in a development/testing environment.
    If you're not sure what this means, you probably have made a mistake.`)
  }
}

export async function loadPolyfill(): Promise<void> {
  showDevelopmentWarning();
  // @ts-ignore
  ({ atob, btoa } = await import('Base64'))
  const { Crypto } = await import('node-webcrypto-ossl')
  crypto = new Crypto()
}

export {
  crypto,
  atob,
  btoa
}

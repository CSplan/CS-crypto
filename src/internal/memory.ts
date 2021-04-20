// Zero out a buffer, should be done with
export function overwriteSecure(view: Uint8Array): void {
  for (let i = 0; i < view.length; i++) {
    view[i] = 0x00
  }
}

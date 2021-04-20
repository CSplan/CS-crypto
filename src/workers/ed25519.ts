import type { JSON_RPC_Request, JSON_RPC_Response } from '../rpc'
import { JSON_RPC_Errors } from '../rpc'
import { overwriteSecure } from '../memory'

// #region WASM Exports

type ED25519_Exports = {
  memory: WebAssembly.Memory
  malloc: (size: number) => number
  free: (ptr: number) => void
  ed25519_keypair: (seed: number, publicKey: number, secretKey: number) => void
}
let ed25519: ED25519_Exports

// #endregion

// #region Method names

// Methods return a result or error, and an optional list of buffers to pass by reference (transfering ownership to the client)
type MethodResult = {
  result?: JSON_RPC_Response['result']
  error?: JSON_RPC_Response['error']
  transfer?: Transferable[]
}

const methods: Map<string, (message: any) => (Promise<MethodResult>)> = new Map()
methods.set('load_ed25519', loadEd25519)
methods.set('generate_keypair', generateKeypair)

// #endregion

// #region Method implementations

async function loadEd25519(message: JSON_RPC_Request & {
  params: {
    path: string
  }
}): Promise<MethodResult> {
  const res = await fetch(message.params.path)
  let src: WebAssembly.WebAssemblyInstantiatedSource

  if (typeof WebAssembly.instantiateStreaming === 'function') {
    src = await WebAssembly.instantiateStreaming(res)
  } else {
    const raw = await res.arrayBuffer()
    src = await WebAssembly.instantiate(raw)
  }

  ed25519 = src.instance.exports as ED25519_Exports
  return {
    result: 0
  }
}

async function generateKeypair(message: JSON_RPC_Request & {
  params: {
    seed: Uint8Array
  }
}): Promise<MethodResult> {
  const privateKeyLen = 64
  const publicKeyLen = 32
  const seedLen = 32

  if (message.params.seed.length !== seedLen) {
    throw new Error('Seeds must be 32 bytes long')
  }

  // Copy the seed into WASM memory
  const seedPtr = ed25519.malloc(seedLen)
  const seedView = new Uint8Array(ed25519.memory.buffer, seedPtr, seedLen)
  for (let i = 0; i < seedLen; i++) {
    seedView[i] = message.params.seed[i]
  }

  // Allocate WASM memory for the ed25519 private and public keys
  const privateKeyPtr = ed25519.malloc(privateKeyLen)
  const publicKeyPtr = ed25519.malloc(publicKeyLen)

  // Call ed25519_keypair
  ed25519.ed25519_keypair(seedPtr, publicKeyPtr, privateKeyPtr)

  // Copy private key into JS memory, then overwrite + free it from WASM memory
  const privateKeyView = new Uint8Array(ed25519.memory.buffer, privateKeyPtr, privateKeyLen)
  const privateKey = new Uint8Array(privateKeyLen)
  for (let i = 0; i < privateKeyLen; i++) {
    privateKey[i] = privateKeyView[i]
  }

  // Overwrite sensitive data and free pointers returned by malloc
  const publicKeyView = new Uint8Array(ed25519.memory.buffer, publicKeyPtr, publicKeyLen)
  overwriteSecure(privateKeyView)
  ed25519.free(privateKeyPtr)
  overwriteSecure(publicKeyView)
  ed25519.free(publicKeyPtr)
  overwriteSecure(seedView)
  overwriteSecure(message.params.seed) // Seed is passed by value, so it should be overwritten as well
  ed25519.free(seedPtr)

  // Return the private key by reference
  return {
    result: privateKey,
    transfer: [privateKey.buffer]
  }
}

// #endregion

onmessage = async (evt: MessageEvent): Promise<void> => {
  const message: JSON_RPC_Request = evt.data
  const method = methods.get(message.method)

  if (method) {
    try {
      const res = await method(message)
      postMessage(<JSON_RPC_Response>{
        jsonrpc: '2.0',
        id: message.id,
        result: res.result,
        error: res.error
      }, res.transfer || [])
    } catch (err) {
      postMessage(<JSON_RPC_Response>{
        jsonrpc: '2.0',
        id: message.id,
        error: {
          code: JSON_RPC_Errors.InternalError,
          message: `error calling ${message.method}: ${err instanceof Error ? err.message : err}`
        }
      })
    }
  } else {
    postMessage(<JSON_RPC_Response>{
      jsonrpc: '2.0',
      id: message.id,
      error: {
        code: JSON_RPC_Errors.UnknownMethod,
        message: `method ${message.method} is unknown`
      }
    })
  }
}

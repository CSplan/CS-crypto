import type { JSON_RPC_Request, JSON_RPC_Response } from '../rpc'
import { JSON_RPC_Errors } from '../rpc'
import * as nacl from 'tweetnacl'

// Methods return a response object, and an optional list of buffers to pass by reference (transfering ownership to the client)
type MethodResult = {
  response: JSON_RPC_Response
  transfer?: Transferable[]
}

const methods: Map<string, (message: any) => MethodResult> = new Map([
  ['generate_from_seed', generateFromSeed]
])

// #region Method implementations
function generateFromSeed(message: JSON_RPC_Request & {
  params: {
    seed: Uint8Array
  }
}): MethodResult {
  let keys: nacl.SignKeyPair
  try {
    keys = nacl.sign.keyPair.fromSeed(message.params.seed)
  } catch (err) {
    return {
      response: {
        jsonrpc: '2.0',
        id: message.id,
        error: {
          code: JSON_RPC_Errors.InternalError,
          message: err
        }
      }
    }
  }

  return {
    response: {
      jsonrpc: '2.0',
      id: message.id,
      result: {
        publicKey: keys.publicKey,
        privateKey: keys.secretKey
      }
    },
    transfer: [keys.publicKey.buffer, keys.secretKey.buffer]
  }
}
// #endregion

onmessage = (evt: MessageEvent): void => {
  const message: JSON_RPC_Request = evt.data
  const method = methods.get(message.method)

  if (method) {
    const result = method(message)
    postMessage(result.response, result.transfer || [])
  } else {
    postMessage(<JSON_RPC_Response>{
      jsonrpc: '2.0',
      id: message.id,
      error: {
        code: JSON_RPC_Errors.UnknownMethod,
        message: 'unknown method'
      }
    })
  }
}

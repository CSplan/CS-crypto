/**
 * This file is meant to keep track of communication with workers with a promise based interface.
 */

import { crypto } from './globals'
import type { JSON_RPC_Request, JSON_RPC_Response } from './rpc'

type MessageResponse = {
  resolve: (value: JSON_RPC_Response['result']) => void
  reject: (value: unknown) => void
}

const promises = new Map<Uint8Array, MessageResponse>([])

function makeID(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(8))
}

/**
 * @internal
 * Send a message to a worker and receive a promise than will resolve when the worker responds.
 */
export function sendMessage(
  worker: Worker,
  method: string,
  params: JSON_RPC_Request['params']
): Promise<JSON_RPC_Response['result']> {
  // Generate a new id for the message
  const id = makeID()

  // Set up the promise that will be triggered when the  worker responds
  const promise: Promise<JSON_RPC_Response['result']> = new Promise((resolve, reject) => {
    promises.set(id, {
      resolve,
      reject
    })
  })

  // Send the JSON_RPC message to the worker
  worker.postMessage(<JSON_RPC_Request>{
    jsonrpc: '2.0',
    id,
    method,
    params
  })

  // Return the previously created promise, which will be resolved when the worker responds
  return promise
}

/**
 * @internal
 * Set up an event listener to resolve promises returned by {@link sendMessage} when the worker sends a response.
 */
export function initResponseListener(worker: Worker): void {
  worker.addEventListener('message', (evt: MessageEvent<JSON_RPC_Response>) => {
    const message = evt.data
    const promise = promises.get(message.id)
    if (!promise) {
      throw new Error(`A response from the worker was received without a corresponding promise (ID: ${message.id})`)
    }

    if (message.error) {
      promise.reject(message.error.message)
    } else if (message.result) {
      promise.resolve(message.result)
    }
  }, true)
}

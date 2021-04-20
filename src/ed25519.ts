import { initResponseListener, sendMessage } from './internal/ipc'
import { Worker } from './globals'

let worker: Worker

export async function init(workerPath: string, wasmPath: string): Promise<void> {
  worker = new Worker(workerPath)
  initResponseListener(worker)
  await sendMessage(worker, 'load_ed25519', {
    path: wasmPath
  })
}

/* eslint-disable camelcase */ // JSON_RPC types can't be clearly expressed without using underscores

/* This file is meant to be a single source of truth used for RPC communication with workers.
 * All RPC communication is achieved through JSON_RPC 2.0, and should be done in ipc.ts.
 * Users of this library should simply load a worker (found in build/workers) and pass it to the init function of whatever part of the library the worker pertains to.
 * From there, the init function will store the worker, and the IPC module will be used to abstract interfacing with the worker using promises.
 * The end result is that multithreaded, non-blocking crypto is achieved without leaving IPC up to users.
 */

/**
 * @internal
 */
export type JSON_RPC_Request = {
  jsonrpc: '2.0'
  id: Uint8Array
  method: string
  params: { [param: string]: unknown }
}

/**
 * @internal
 */
export type JSON_RPC_Response = {
  jsonrpc: '2.0'
  id: Uint8Array
  result?: unknown
  error?: {
    code: number
    message: string
  }
}

/**
 * @internal
 */
export enum JSON_RPC_Errors {
  UnknownMethod = 0,
  InternalError = 1
}

/* tslint:disable */
/* eslint-disable */
/**
* Simple WASM `add` function
*
* WASM `add` function to demonstrate
* how to to import WASM functions into
* NextJS
*
* # Arguments
*
* * `left` - The first number
* * `right` - The second number to add to `left`
*
* # Examples
*
* ```js
* ```
* @param {number} left
* @param {number} right
* @returns {number}
*/
export function wasm_add(left: number, right: number): number;
/**
* @returns {any}
*/
export function wasm_get_phantom(): any;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly wasm_add: (a: number, b: number) => number;
  readonly wasm_get_phantom: (a: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;

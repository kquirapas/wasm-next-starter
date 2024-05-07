/*
 * Used to prevent unhandled errors
 * and prefix WASM-originating errors
 * with `ERR_WASM`
 */
type AnyFunction = (...args: any[]) => any; // transient / ephemeral type for readability

export function tryCatchWasmWrapper(
  func: (...args: any[]) => any,
): AnyFunction {
  return (...args) => {
    try {
      return func(...args);
    } catch (err) {
      console.error("ERR_WASM:", err);
    }
  };
}

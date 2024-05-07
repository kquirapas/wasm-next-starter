/*
 * Used to prevent unhandled errors
 * and prefix WASM-originating errors
 * with `ERR_WASM`
 */
type AnyFunction = () => any; // new type for readability

export function tryCatchWasmWrapper(
  func: (...args: any[]) => any,
): AnyFunction {
  return () => {
    try {
      return func();
    } catch (err) {
      console.error("ERR_WASM:", err);
    }
  };
}

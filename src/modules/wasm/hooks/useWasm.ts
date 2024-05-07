"use client";
import { useEffect, useState } from "react";
import init, { wasm_add, wasm_get_phantom } from "../pkg";

// For type casting WASM functions
export type Wasm = {
  add: (x: number, y: number) => number;
  getPhantom: () => any;
};

type AnyFunction = () => any;

/*
 * Used to prevent unhandled errors
 * and prefix WASM-originating errors
 * with `ERR_WASM`
 */
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

export default function useWasm() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [adapter, setAdapter] = useState<Wasm>({
    // initialize functions
    add: () => 0,
    getPhantom: () => {},
  });

  useEffect(() => {
    (async () => {
      try {
        // Load WASM
        await init();
        setAdapter({
          add: tryCatchWasmWrapper(wasm_add),
          getPhantom: tryCatchWasmWrapper(wasm_get_phantom),
        });
        setIsLoading(false);
        setIsError(false);
      } catch (err) {
        setIsError(true);
        console.error(err);
      }
    })();
  }, []);

  return { ...adapter, isError, isLoading };
}

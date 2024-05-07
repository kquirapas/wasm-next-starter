"use client";
import { useEffect, useState } from "react";
import init, { wasm_add, wasm_get_phantom } from "../pkg/wasm";
import { Wasm } from "../types";
import { tryCatchWasmWrapper } from "../utils";

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
        // Load WASM with `init()`
        // See `Without a Bundler` guide in
        // https://rustwasm.github.io/wasm-bindgen/examples/without-a-bundler.html
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

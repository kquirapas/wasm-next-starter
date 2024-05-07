//! Module to demonstrate how to use WASM functions
//! in NextJS with `wasm_bindgen`, `web_sys`, and `js_sys`.
//!
//! All functions are prefixed with `wasm_` to maintain
//! clear distinction when calling WASM functions in
//! NextJS
//!
//! Logging
//!
//! ```rust
//! web_sys::console::log_1(&"[WASM] LOG: There is a window object in DOM".into());
//! ```
//!
//! Error Logging are done respectively
//!
//! ```rust
//! web_sys::console::error_1(&err);
//! web_sys::console::error_2(&"[WASM] ERR".into(), &err);
//! ```
//!
//! By preference, I want production logging to stay in NextJS only
//! and propagate JsValues or JsErrors as needed
//!
//! # Examples
//!
//! ```js
//! "use client"; // Prevents the useWasm is not a function error
//! import { useWasm } from "@/modules/wasm";
//!
//! export default function Home() {
//!   const { add, getPhantom, isLoading } = useWasm();
//!   return (
//!     <main className="text-green-500">
//!       {isLoading ? (
//!         <div>Loading...</div>
//!       ) : (
//!         <div>
//!           <span>{`1 + 1 = ${add(1, 1)}`}</span>
//!           <div>{String(getPhantom().solana?.isPhantom)}</div>
//!         </div>
//!       )}
//!     </main>
//!   );
//! }
//! ```
use js_sys::Reflect;
use wasm_bindgen::prelude::*;
use web_sys::window;

mod errors;
use errors::WasmError;

/// Simple WASM `add` function
///
/// WASM `add` function to demonstrate
/// how to to import WASM functions into
/// NextJS
///
/// # Arguments
///
/// * `left` - The first number
/// * `right` - The second number to add to `left`
///
#[wasm_bindgen]
pub fn wasm_add(left: usize, right: usize) -> usize {
    left + right
}

/// WASM function to access DOM and injected DOM with
/// proper error handling
///
/// Injected DOM is usually seen in Web3 development
/// (e.g. window.ethereum, window.phantom) and is injected
/// on load and not natively part of the DOM
///
/// Typical error propagation can be done with the
/// `Result<JsValue, JsError>` return value.
/// You can create new JsErrors with `JsError::new()`
#[wasm_bindgen]
pub fn wasm_get_phantom() -> Result<JsValue, JsError> {
    /*
     * GET: window from DOM
     * Demonstrate how `web_sys` is used as a convenience
     * library for DOM access
     */
    let window = match window() {
        Some(val) => val,
        None => return Err(WasmError::WindowUndefined.into()),
    };

    /*
     * GET: window.phantom
     * Demonstrate `js_sys` `Reflect::get` for DOM-injected
     * objects like `window.ethereum` and `window.phantom`
     * typically encountered in Web3
     */
    match Reflect::get(&window, &"phantom".into()) {
        Ok(val) => Ok(val),
        Err(_) => Err(WasmError::PhantomNotInstalled.into()),
    }
}

//! Custom WASM Errors
use thiserror::Error;

#[derive(Error, Debug)]
pub enum WasmError {
    #[error("No window object")]
    WindowUndefined,
    #[error("Please install Phantom Browser Wallet: https://phantom.app/download")]
    PhantomNotInstalled,
}

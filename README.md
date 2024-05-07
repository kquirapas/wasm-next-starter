# Metaprogramming with WASM and NextJS

A WASM and NextJS starter built with Rust.

## Why?

To stay updated and sharp with WASM as well as explore WASM-enabled optimizations in Web3.

## Setup

### Prerequisite

- Install `wasm-pack` ([Here](https://github.com/rustwasm/wasm-pack))

### Steps

1. Build `wasm` with 'yarn run build-wasm'

```js
  "scripts": {
    // next build prepended with build-wasm command "build": "wasm-pack build wasm --target web --out-dir ../src/modules/wasm/pkg --no-pack && next build",
    "build": "wasm-pack build wasm --target web --out-dir ../src/modules/wasm/pkg --no-pack && next build",
    // build-wasm definition in package.json
	"build-wasm": "wasm-pack build wasm --target web --out-dir ../src/modules/wasm/pkg --no-pack"
  },
```

## Feedback

Open an issue for suggestions

## Author's Note

I mainly use this in Web3.

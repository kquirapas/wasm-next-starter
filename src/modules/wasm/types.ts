// For type casting WASM functions
export type Wasm = {
  add: (x: number, y: number) => number;
  getPhantom: () => any;
};

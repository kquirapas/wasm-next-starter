"use client"; // Prevents the useWasm is not a function error
import { useWasm } from "@/modules/wasm";

export default function Home() {
  const { add, getPhantom, isLoading } = useWasm();
  return (
    <main className="text-green-500">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <span>{`1 + 1 = ${add(1, 1)}`}</span>
          <div>{String(getPhantom().solana?.isPhantom)}</div>
        </div>
      )}
    </main>
  );
}

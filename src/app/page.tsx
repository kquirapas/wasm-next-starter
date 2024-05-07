"use client"; // Prevents the useWasm is not a function error
import { useWasm } from "@/modules/wasm";

export default function Home() {
  const { add, getPhantom, isLoading } = useWasm();

  const checkPhantom = () => {
    if (isLoading) return;
    try {
      let phantom = getPhantom();
      let isPhantom = phantom.solana.isPhantom;
      return isPhantom ? "Yes Phantom" : "No Phantom";
    } catch (err) {
      console.error(err);
      return "No Phantom";
    }
  };

  return (
    <main className="text-green-500">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <span>{`1 + 1 = ${add(1, 1)}`}</span>
          <div>{checkPhantom()}</div>
        </div>
      )}
    </main>
  );
}

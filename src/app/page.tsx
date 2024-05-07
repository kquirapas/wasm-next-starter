import { useWasm } from "@/modules/wasm";

export default function Home() {
  const { add, getPhantom, isLoading } = useWasm();
  return (
    <main className="text-green-500">
      {isLoading && (
        <div>
          <span>{`1 + 1 = ${add(1, 1)}`}</span>
          <div>{JSON.stringify(getPhantom())}</div>
        </div>
      )}
    </main>
  );
}

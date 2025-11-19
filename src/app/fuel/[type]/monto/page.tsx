"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import Keypad from "@/components/Keypad";
import Header from "@/components/Header";

const types = ["diesel", "super", "regular"] as const;

type Props = { params: Promise<{ type: string }> };

export default function MontoPage({ params }: Props) {
  const [val, setVal] = useState("");
  const router = useRouter();
  const { type: typeRaw } = use(params);
  const type = (typeRaw || "").toLowerCase();

  if (!types.includes(type as any)) return notFound();

  const label = type === "diesel" ? "Diésel" : type === "super" ? "Súper" : "Regular";

  return (
    <div className="min-h-screen w-full bg-gris-claro flex flex-col items-center justify-center relative">
      <Header />
      <main className="w-full max-w-5xl px-6 py-12 text-center mt-16">
        <h1 className="text-4xl md:text-5xl font-semibold text-vino mb-6 text-center">Monto - {label}</h1>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <p className="text-2xl text-vino mb-2">Ingrese el monto (Q)</p>
            <Keypad
              value={val}
              onChange={setVal}
              onSubmit={() => router.push(`/fuel/${type}/pago?mode=monto&value=${encodeURIComponent(val || "0")}`)}
            />
          </div>
          <div className="md:w-72 w-full space-y-4">
            <div className="p-6 rounded-md border border-gris-medio bg-white">
              <p className="text-xl text-vino/80">Resumen</p>
              <p className="text-4xl font-semibold mt-2 text-vino">Q {val || 0}</p>
            </div>
            <Link href={`/fuel/${type}`} className="block text-center text-2xl px-6 py-4 rounded-md bg-white border border-gris-medio hover:bg-gris-medio/20 text-vino">Atrás</Link>
            <Link href="/" className="block text-center text-2xl px-6 py-4 rounded-md bg-white border border-gris-medio hover:bg-gris-medio/20 text-vino">Cancelar</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

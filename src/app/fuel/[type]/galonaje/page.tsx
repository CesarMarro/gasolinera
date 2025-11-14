"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Keypad from "@/components/Keypad";

type Props = { params: Promise<{ type: string }> };

export default function GalonajePage({ params }: Props) {
  const [val, setVal] = useState("");
  const router = useRouter();
  const { type } = use(params);
  const label = type === "diesel" ? "Diésel" : type === "super" ? "Súper" : "Regular";

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <main className="w-full max-w-5xl px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 text-center">Galonaje - {label}</h1>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <p className="text-2xl text-slate-700 mb-2">Ingrese galones</p>
            <Keypad
              value={val}
              onChange={setVal}
              onSubmit={() => router.push(`/fuel/${type}/pago?mode=galonaje&value=${encodeURIComponent(val || "0")}`)}
            />
          </div>
          <div className="md:w-72 w-full space-y-4">
            <div className="p-6 rounded-md border border-slate-200">
              <p className="text-xl text-slate-700">Resumen</p>
              <p className="text-4xl font-semibold mt-2 text-slate-900">{val || 0} gal</p>
            </div>
            <Link href={`/fuel/${type}`} className="block text-center text-2xl px-6 py-4 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800">Atrás</Link>
            <Link href="/" className="block text-center text-2xl px-6 py-4 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800">Cancelar</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

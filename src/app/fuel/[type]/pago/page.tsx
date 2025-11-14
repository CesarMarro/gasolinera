"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = { params: Promise<{ type: string }> };

export default function PagoPage({ params }: Props) {
  const router = useRouter();
  const search = useSearchParams();
  const mode = search.get("mode") || "monto";
  const value = search.get("value") || "0";
  const { type } = use(params);
  const label = type === "diesel" ? "Diésel" : type === "super" ? "Súper" : "Regular";

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <main className="w-full max-w-4xl px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-2 text-center">Pago con tarjeta</h1>
        <p className="text-center text-slate-600 mb-10 text-xl">{label} · {mode === "full" ? "Servicio Full" : mode === "monto" ? `Monto Q${value}` : `Galonaje ${value} gal`}</p>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="p-6 border border-slate-200 rounded-md">
            <p className="text-2xl text-slate-800 mb-4">Inserte o acerque su tarjeta</p>
            <div className="h-40 bg-slate-100 border border-slate-200 rounded-md flex items-center justify-center text-slate-500 text-xl">
              Lector de tarjeta
            </div>
          </div>
          <div className="p-6 border border-slate-200 rounded-md space-y-3">
            <p className="text-xl text-slate-700">Resumen</p>
            <ul className="text-lg text-slate-600">
              <li>Tipo: <span className="text-slate-900 font-medium">{label}</span></li>
              <li>Modo: <span className="text-slate-900 font-medium">{mode}</span></li>
              <li>Valor: <span className="text-slate-900 font-medium">{mode === "monto" ? `Q${value}` : mode === "galonaje" ? `${value} gal` : "N/A"}</span></li>
            </ul>
            <button
              className="w-full text-2xl py-4 rounded-md bg-emerald-700 hover:bg-emerald-600 text-white"
              onClick={() => router.push(`/fuel/${type}/llenando?mode=${encodeURIComponent(mode)}&value=${encodeURIComponent(value)}`)}
            >
              Procesar pago
            </button>
            <div className="flex gap-3">
              <Link href={`/fuel/${type}`} className="flex-1 text-center text-xl px-6 py-3 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800">Atrás</Link>
              <Link href="/" className="flex-1 text-center text-xl px-6 py-3 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800">Cancelar</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

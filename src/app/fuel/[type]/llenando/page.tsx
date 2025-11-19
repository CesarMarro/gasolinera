"use client";

import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

export default function LlenandoPage({ params }: { params: Promise<{ type: string }> }) {
  const router = useRouter();
  const search = useSearchParams();
  const mode = search.get("mode") || "monto";
  const value = search.get("value") || "0";
  const { type } = use(params);

  const [progress, setProgress] = useState(0);

  const label = type === "diesel" ? "Diésel" : type === "super" ? "Súper" : "Regular";
  const PRICE_PER_GALLON_Q = 29;
  const isGalonaje = mode === "galonaje";
  const targetGallons = isGalonaje ? Math.max(0, Number(value) || 0) : 0;
  const currentGallons = isGalonaje ? Math.round((targetGallons * progress) / 100 * 1000) / 1000 : 0;
  const currentCostQ = isGalonaje ? Math.round(currentGallons * PRICE_PER_GALLON_Q * 100) / 100 : 0;

  useEffect(() => {
    const durationMs = 5000; // 5s mock
    const start = Date.now();
    const t = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(t);
        setTimeout(() => {
          router.push(`/fuel/${type}/final?mode=${encodeURIComponent(mode)}&value=${encodeURIComponent(value)}`);
        }, 500);
      }
    }, 100);
    return () => clearInterval(t);
  }, [mode, type, router, value]);

  return (
    <div className="min-h-screen w-full bg-gris-claro flex flex-col items-center justify-center relative">
      <Header />
      <main className="w-full max-w-3xl px-6 py-12 text-center mt-16">
        <h1 className="text-4xl md:text-5xl font-semibold text-vino mb-2 text-center">Llenando…</h1>
        <p className="text-center text-vino/80 mb-8 text-xl">{label} · {mode === "full" ? "Servicio Full" : mode === "monto" ? `Monto Q${value}` : `Galonaje ${value} gal`}</p>

        <div className="space-y-4">
          <div className="h-6 w-full bg-white border border-gris-medio rounded-sm">
            <div className="h-full bg-rojo-fuerte rounded-sm transition-all animate-fill-progress" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-4xl text-center font-medium text-vino">{progress}%</div>
          <p className="text-center text-vino/60">Por favor, espere…</p>

          {isGalonaje && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <div className="p-4 border border-gris-medio rounded-md text-center bg-white">
                <div className="text-sm text-vino/60">Precio por galón</div>
                <div className="text-2xl font-semibold text-vino">Q {PRICE_PER_GALLON_Q.toFixed(2)}</div>
              </div>
              <div className="p-4 border border-gris-medio rounded-md text-center bg-white">
                <div className="text-sm text-vino/60">Galones</div>
                <div className="text-2xl font-semibold text-vino">{currentGallons.toFixed(3)}</div>
              </div>
              <div className="p-4 border border-gris-medio rounded-md text-center bg-white">
                <div className="text-sm text-vino/60">Total (Q)</div>
                <div className="text-2xl font-semibold text-vino">Q {currentCostQ.toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

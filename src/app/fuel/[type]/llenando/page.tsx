"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LlenandoPage({ params }: { params: Promise<{ type: string }> }) {
  const router = useRouter();
  const search = useSearchParams();
  const mode = search.get("mode") || "monto";
  const value = search.get("value") || "0";

  const [progress, setProgress] = useState(0);

  const { type } = use(params);
  const label = useMemo(() => (
    type === "diesel" ? "Diésel" : type === "super" ? "Súper" : "Regular"
  ), [type]);

  const PRICE_PER_GALLON_Q = 29; // Referencia pública 2025
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
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <main className="w-full max-w-3xl px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-2 text-center">Llenando…</h1>
        <p className="text-center text-slate-600 mb-8 text-xl">{label} · {mode === "full" ? "Servicio Full" : mode === "monto" ? `Monto Q${value}` : `Galonaje ${value} gal`}</p>

        <div className="space-y-4">
          <div className="h-6 w-full bg-slate-200 rounded-sm">
            <div className="h-6 bg-emerald-700 rounded-sm transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-4xl text-center font-medium text-slate-900">{progress}%</div>
          <p className="text-center text-slate-500">Por favor, espere…</p>

          {isGalonaje && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <div className="p-4 border border-slate-200 rounded-md text-center">
                <div className="text-sm text-slate-500">Precio por galón</div>
                <div className="text-2xl font-semibold text-slate-900">Q {PRICE_PER_GALLON_Q.toFixed(2)}</div>
              </div>
              <div className="p-4 border border-slate-200 rounded-md text-center">
                <div className="text-sm text-slate-500">Galones</div>
                <div className="text-2xl font-semibold text-slate-900">{currentGallons.toFixed(3)}</div>
              </div>
              <div className="p-4 border border-slate-200 rounded-md text-center">
                <div className="text-sm text-slate-500">Total (Q)</div>
                <div className="text-2xl font-semibold text-slate-900">Q {currentCostQ.toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

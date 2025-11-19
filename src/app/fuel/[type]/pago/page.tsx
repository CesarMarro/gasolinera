"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default async function PagoPage({ params, searchParams }: { params: Promise<{ type: string }>, searchParams: Promise<Record<string, string>> }) {
  const router = useRouter();
  const { type } = await params;
  const sp = await searchParams;
  const label = type === "diesel" ? "Diésel" : type === "super" ? "Súper" : "Regular";
  const mode = sp?.mode || "monto";
  const value = sp?.value || "0";

  const PRICE_PER_GALLON_Q = 29; // referencia, puede ajustarse

  let displayMonto = "0.00";
  let displayGalones = "0.00";

  if (mode === "monto") {
    displayMonto = parseFloat(value).toFixed(2);
    displayGalones = (parseFloat(value) / PRICE_PER_GALLON_Q).toFixed(2);
  } else if (mode === "galonaje") {
    displayGalones = parseFloat(value).toFixed(2);
    displayMonto = (parseFloat(value) * PRICE_PER_GALLON_Q).toFixed(2);
  } else {
    // full
    displayMonto = "Full";
    displayGalones = "Full";
  }

  const isFull = mode === "full";
  const isGalonaje = mode === "galonaje";
  const gallons = isGalonaje ? Math.max(0, Number(value) || 0) : 0;
  const totalGalonajeQ = isGalonaje ? Math.round(gallons * PRICE_PER_GALLON_Q * 100) / 100 : 0;

  return (
    <div className="min-h-screen w-full bg-gris-claro flex flex-col items-center justify-center relative">
      <Header />
      <main className="w-full max-w-3xl px-6 py-12 text-center mt-16">
        <h1 className="text-4xl md:text-5xl font-semibold text-vino mb-2 text-center">Pago con tarjeta</h1>
        <p className="text-center text-vino/80 mb-10 text-xl">{label} · {mode === "full" ? "Servicio Full" : mode === "monto" ? `Monto Q${value}` : `Galonaje ${value} gal`}</p>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="p-6 border border-gris-medio rounded-md bg-white">
            <p className="text-2xl text-vino mb-4">Inserte o acerque su tarjeta</p>
            <div className="h-40 bg-gris-claro border border-gris-medio rounded-md flex items-center justify-center text-vino/50 text-xl">
              Lector de tarjeta
            </div>
          </div>
          <div className="p-6 border border-gris-medio rounded-md space-y-3 bg-white">
            <p className="text-xl text-vino/80">Resumen</p>
            <ul className="text-lg text-vino/80">
              <li>Tipo: <span className="text-vino font-medium">{label}</span></li>
              <li>Modo: <span className="text-vino font-medium">{mode}</span></li>
              {isGalonaje ? (
                <>
                  <li>Galones: <span className="text-vino font-medium">{gallons} gal</span></li>
                  <li>Precio por galón: <span className="text-vino font-medium">Q {PRICE_PER_GALLON_Q.toFixed(2)}</span></li>
                  <li>Total a pagar: <span className="text-vino font-semibold">Q {totalGalonajeQ.toFixed(2)}</span></li>
                </>
              ) : (
                <li>Valor: <span className="text-vino font-medium">{isFull ? `Q1000 (preautorización)` : mode === "monto" ? `Q${value}` : "N/A"}</span></li>
              )}
            </ul>
            {isFull && (
              <div className="text-sm text-vino/80 bg-amber-50 border border-amber-200 rounded-md p-3">
                Se realizará un cargo de Q1000 como preautorización. El excedente será reembolsado en un máximo de 2 días hábiles.
              </div>
            )}
            <button
              className="w-full text-2xl py-4 rounded-md bg-rojo-fuerte hover:bg-rojo-oscuro text-white"
              onClick={() => router.push(`/fuel/${type}/llenando?mode=${encodeURIComponent(mode)}&value=${encodeURIComponent(value)}`)}
            >
              {isFull ? "Procesar preautorización Q1000" : isGalonaje ? `Pagar Q ${totalGalonajeQ.toFixed(2)}` : `Pagar Q ${Number(value || 0).toFixed(2)}`}
            </button>
            <div className="flex gap-3">
              <Link href={`/fuel/${type}`} className="flex-1 text-center text-xl px-6 py-3 rounded-md bg-white border border-gris-medio hover:bg-gris-medio/20 text-vino">Atrás</Link>
              <Link href="/" className="flex-1 text-center text-xl px-6 py-3 rounded-md bg-white border border-gris-medio hover:bg-gris-medio/20 text-vino">Cancelar</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

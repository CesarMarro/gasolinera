import Link from "next/link";

export default async function FinalPage({ params, searchParams }: { params: Promise<{ type: string }>, searchParams: Promise<Record<string, string>> }) {
  const { type } = await params;
  const sp = await searchParams;
  const label = type === "diesel" ? "Diésel" : type === "super" ? "Súper" : "Regular";
  const mode = sp?.mode || "monto";
  const value = sp?.value || "0";

  // Para modo Full: simular monto final aleatorio Q200–Q600 y reembolso de diferencia sobre Q1000
  const isFull = mode === "full";
  const fullTotal = isFull ? Math.floor(Math.random() * 401) + 200 : null; // 200..600
  const refund = isFull && fullTotal !== null ? Math.max(0, 1000 - fullTotal) : 0;

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <main className="w-full max-w-3xl px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">Operación completada</h1>
        <p className="text-xl text-slate-700 mb-6">{label} · {mode === "full" ? "Servicio Full" : mode === "monto" ? `Monto Q${value}` : `Galonaje ${value} gal`}</p>

        {isFull && fullTotal !== null && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            <div className="p-4 border border-slate-200 rounded-md text-center">
              <div className="text-sm text-slate-500">Cargo inicial</div>
              <div className="text-2xl font-semibold text-slate-900">Q 1000.00</div>
            </div>
            <div className="p-4 border border-slate-200 rounded-md text-center">
              <div className="text-sm text-slate-500">Consumo final</div>
              <div className="text-2xl font-semibold text-slate-900">Q {fullTotal.toFixed(2)}</div>
            </div>
            <div className="p-4 border border-slate-200 rounded-md text-center">
              <div className="text-sm text-slate-500">Reembolso estimado</div>
              <div className="text-2xl font-semibold text-slate-900">Q {refund.toFixed(2)}</div>
            </div>
          </div>
        )}

        <div className="p-6 border border-slate-200 rounded-md mb-8">
          <p className="text-2xl text-slate-800">Por favor, retire la manguera.</p>
          {isFull && (
            <p className="text-sm text-slate-600 mt-3">El excedente del cargo inicial será reembolsado en un máximo de 2 días hábiles.</p>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/fuel" className="text-2xl px-6 py-3 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800">Nueva operación</Link>
          <Link href="/" className="text-2xl px-6 py-3 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800">Cancelar</Link>
        </div>
      </main>
    </div>
  );
}

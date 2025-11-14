import Link from "next/link";

export default async function FinalPage({ params, searchParams }: { params: Promise<{ type: string }>, searchParams: Promise<Record<string, string>> }) {
  const { type } = await params;
  const sp = await searchParams;
  const label = type === "diesel" ? "Diésel" : type === "super" ? "Súper" : "Regular";
  const mode = sp?.mode || "monto";
  const value = sp?.value || "0";

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <main className="w-full max-w-3xl px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">Operación completada</h1>
        <p className="text-xl text-slate-700 mb-10">{label} · {mode === "full" ? "Servicio Full" : mode === "monto" ? `Monto Q${value}` : `Galonaje ${value} gal`}</p>

        <div className="p-6 border border-slate-200 rounded-md mb-8">
          <p className="text-2xl text-slate-800">Por favor, retire la manguera.</p>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/fuel" className="text-2xl px-6 py-3 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800">Nueva operación</Link>
          <Link href="/" className="text-2xl px-6 py-3 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800">Cancelar</Link>
        </div>
      </main>
    </div>
  );
}

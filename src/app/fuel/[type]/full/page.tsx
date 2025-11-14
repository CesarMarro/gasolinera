import Link from "next/link";

type Props = { params: Promise<{ type: string }> };

export default async function FullPage({ params }: Props) {
  const { type } = await params;
  const label = type === "diesel" ? "Diésel" : type === "super" ? "Súper" : "Regular";
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <main className="w-full max-w-3xl px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6">Servicio Full - {label}</h1>
        <p className="text-2xl text-slate-700 mb-10">Un despachador procederá a llenar el tanque.</p>
        <div className="flex justify-center gap-4">
          <Link href={`/fuel/${type}`} className="text-2xl px-6 py-3 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800">Atrás</Link>
          <Link href={`/fuel/${type}/pago?mode=full`} className="text-2xl px-6 py-3 rounded-md bg-emerald-700 hover:bg-emerald-600 text-white">Proceder a pago</Link>
        </div>
      </main>
    </div>
  );
}

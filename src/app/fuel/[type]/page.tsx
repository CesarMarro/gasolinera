import Link from "next/link";
import { notFound } from "next/navigation";

const types = ["diesel", "super", "regular"] as const;

type Props = { params: Promise<{ type: string }> };

export default async function FuelTypePage({ params }: Props) {
  const { type: typeRaw } = await params;
  const type = (typeRaw || "").toLowerCase();
  if (!types.includes(type as any)) return notFound();

  const label = type === "diesel" ? "Diésel" : type === "super" ? "Súper" : "Regular";

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <main className="w-full max-w-4xl px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-8">
          {label}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Link
            href={`/fuel/${type}/full`}
            className="block py-10 rounded-md text-3xl font-medium bg-amber-700 text-white hover:bg-amber-600 border border-amber-700"
          >
            Full
          </Link>
          <Link
            href={`/fuel/${type}/monto`}
            className="block py-10 rounded-md text-3xl font-medium bg-emerald-700 text-white hover:bg-emerald-600 border border-emerald-700"
          >
            Ingresar monto
          </Link>
          <Link
            href={`/fuel/${type}/galonaje`}
            className="block py-10 rounded-md text-3xl font-medium bg-sky-700 text-white hover:bg-sky-600 border border-sky-700"
          >
            Ingresar galonaje
          </Link>
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/fuel" className="text-2xl px-6 py-3 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800">Atrás</Link>
          <Link href="/" className="text-2xl px-6 py-3 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800">Inicio</Link>
        </div>
      </main>
    </div>
  );
}

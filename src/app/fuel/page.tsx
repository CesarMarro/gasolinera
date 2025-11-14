import Link from "next/link";

export default function FuelSelection() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <main className="w-full max-w-5xl px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-8">
          Selecciona el tipo de gasolina
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/fuel/diesel"
            className="block py-12 rounded-md text-3xl font-medium bg-slate-900 text-white hover:bg-slate-800 border border-slate-900"
          >
            Diésel
          </Link>
          <Link
            href="/fuel/super"
            className="block py-12 rounded-md text-3xl font-medium bg-emerald-700 text-white hover:bg-emerald-600 border border-emerald-700"
          >
            Súper
          </Link>
          <Link
            href="/fuel/regular"
            className="block py-12 rounded-md text-3xl font-medium bg-blue-700 text-white hover:bg-blue-600 border border-blue-700"
          >
            Regular
          </Link>
        </div>
      </main>
    </div>
  );
}

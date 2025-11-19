import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

export default function FuelSelection() {
  return (
    <div className="min-h-screen w-full bg-gris-claro flex flex-col items-center justify-center relative">
      <Header />
      <main className="w-full max-w-5xl px-6 py-12 text-center mt-16">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Logo Gasolinera"
            width={250}
            height={125}
            className="h-auto w-auto max-h-32 object-contain"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-vino mb-8">
          Selecciona el tipo de gasolina
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/fuel/diesel"
            className="block py-12 rounded-md text-3xl font-medium bg-green-700 text-white hover:bg-green-800 shadow-sm transition-colors border border-green-800"
          >
            Diésel
          </Link>
          <Link
            href="/fuel/super"
            className="block py-12 rounded-md text-3xl font-medium bg-amber-500 text-white hover:bg-amber-600 shadow-sm transition-colors border border-amber-600"
          >
            Súper
          </Link>
          <Link
            href="/fuel/regular"
            className="block py-12 rounded-md text-3xl font-medium bg-slate-400 text-white hover:bg-slate-500 shadow-sm transition-colors border border-slate-500"
          >
            Regular
          </Link>
        </div>
      </main>
    </div>
  );
}

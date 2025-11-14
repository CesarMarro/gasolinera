import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-50 to-white flex items-center justify-center">
      <main className="w-full max-w-4xl px-6 py-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
          Bienvenido
        </h1>
        <p className="text-2xl md:text-3xl text-slate-600 mb-12">
          Autoservicio - Gasolinera
        </p>
        <div className="flex items-center justify-center">
          <Link
            href="/fuel"
            className="block w-full max-w-md text-3xl md:text-4xl font-semibold bg-green-700 hover:bg-green-600 text-white rounded-md py-8 px-6 shadow-sm transition-colors"
          >
            Comenzar
          </Link>
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gris-claro flex items-center justify-center">
      <main className="w-full max-w-4xl px-6 py-12 text-center">
        <div className="flex justify-center items-center gap-4 md:gap-8 mb-8 md:mb-12">
          <Image
            src="/logo.png"
            alt="Logo Gasolinera"
            width={300}
            height={150}
            priority
            className="h-auto w-auto max-h-32 md:max-h-48 object-contain"
          />
          <Image
            src="/logo2.png"
            alt="Logo Secundario"
            width={300}
            height={150}
            priority
            className="h-auto w-auto max-h-32 md:max-h-48 object-contain brightness-0 opacity-80"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-vino mb-4">
          Bienvenido
        </h1>
        <p className="text-2xl md:text-3xl text-vino/80 mb-12">
          Autoservicio - Gasolinera
        </p>
        <div className="flex items-center justify-center">
          <Link
            href="/fuel"
            className="block w-full max-w-md text-3xl md:text-4xl font-semibold bg-rojo-fuerte hover:bg-rojo-oscuro text-white rounded-md py-8 px-6 shadow-sm transition-colors"
          >
            Comenzar
          </Link>
        </div>
      </main>
    </div>
  );
}

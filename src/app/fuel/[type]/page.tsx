import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";

const types = ["diesel", "super", "regular"] as const;

type Props = { params: Promise<{ type: string }> };

export default async function FuelTypePage({ params }: Props) {
  const { type: typeRaw } = await params;
  const type = (typeRaw || "").toLowerCase();
  if (!types.includes(type as any)) return notFound();

  const label = type === "diesel" ? "Diésel" : type === "super" ? "Súper" : "Regular";

  return (
    <div className="min-h-screen w-full bg-gris-claro flex flex-col items-center justify-center relative">
      <Header />
      <main className="w-full max-w-4xl px-6 py-12 text-center mt-16">
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
          {label}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Link
            href={`/fuel/${type}/full`}
            className="block py-10 rounded-md text-3xl font-medium bg-rojo-fuerte text-white hover:bg-rojo-oscuro shadow-sm transition-colors"
          >
            Full
          </Link>
          <Link
            href={`/fuel/${type}/monto`}
            className="block py-10 rounded-md text-3xl font-medium bg-rojo-fuerte text-white hover:bg-rojo-oscuro shadow-sm transition-colors"
          >
            Ingresar monto
          </Link>
          <Link
            href={`/fuel/${type}/galonaje`}
            className="block py-10 rounded-md text-3xl font-medium bg-rojo-fuerte text-white hover:bg-rojo-oscuro shadow-sm transition-colors"
          >
            Ingresar galonaje
          </Link>
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/fuel" className="text-2xl px-6 py-3 rounded-md bg-white border border-gris-medio hover:bg-gris-medio/20 text-vino">Atrás</Link>
          <Link href="/" className="text-2xl px-6 py-3 rounded-md bg-white border border-gris-medio hover:bg-gris-medio/20 text-vino">Cancelar</Link>
        </div>
      </main>
    </div>
  );
}

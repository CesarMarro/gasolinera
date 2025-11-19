import Link from "next/link";
import Header from "@/components/Header";

export default async function FullPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const label = type === "diesel" ? "Diésel" : type === "super" ? "Súper" : "Regular";

  return (
    <div className="min-h-screen w-full bg-gris-claro flex flex-col items-center justify-center relative">
      <Header />
      <main className="w-full max-w-md px-6 py-12 text-center mt-16">
        <h1 className="text-4xl md:text-5xl font-semibold text-vino mb-6">Servicio Full - {label}</h1>
        <p className="text-2xl text-vino/80 mb-10">Modalidad Autoservicio: Usted mismo llenará el tanque.</p>
        <div className="flex justify-center gap-4">
          <Link href={`/fuel/${type}`} className="text-2xl px-6 py-3 rounded-md bg-white border border-gris-medio hover:bg-gris-medio/20 text-vino">Atrás</Link>
          <Link href={`/fuel/${type}/pago?mode=full`} className="text-2xl px-6 py-3 rounded-md bg-rojo-fuerte hover:bg-rojo-oscuro text-white">Proceder a pago</Link>
        </div>
      </main>
    </div>
  );
}

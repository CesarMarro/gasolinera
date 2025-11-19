import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

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
    <div className="min-h-screen w-full bg-gris-claro flex flex-col items-center justify-center relative">
      <Header />
      <main className="w-full max-w-3xl px-6 py-12 text-center mt-16">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo2.png"
            alt="Logo Secundario"
            width={200}
            height={100}
            className="h-auto w-auto max-h-24 md:max-h-32 object-contain brightness-0 opacity-80"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-vino mb-4">Operación completada</h1>
        <p className="text-xl text-vino/80 mb-6">{label} · {mode === "full" ? "Servicio Full" : mode === "monto" ? `Monto Q${value}` : `Galonaje ${value} gal`}</p>

        {isFull && fullTotal !== null && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            <div className="p-4 border border-gris-medio rounded-md text-center bg-white">
              <div className="text-sm text-vino/60">Cargo inicial</div>
              <div className="text-2xl font-semibold text-vino">Q 1000.00</div>
            </div>
            <div className="p-4 border border-gris-medio rounded-md text-center bg-white">
              <div className="text-sm text-vino/60">Consumo final</div>
              <div className="text-2xl font-semibold text-vino">Q {fullTotal.toFixed(2)}</div>
            </div>
            <div className="p-4 border border-gris-medio rounded-md text-center bg-white">
              <div className="text-sm text-vino/60">Reembolso estimado</div>
              <div className="text-2xl font-semibold text-vino">Q {refund.toFixed(2)}</div>
            </div>
          </div>
        )}

        <div className="p-6 border border-gris-medio rounded-md mb-8 bg-white">
          <p className="text-2xl text-vino">Por favor, retire la manguera.</p>
          {isFull && (
            <p className="text-sm text-vino/60 mt-3">El excedente del cargo inicial será reembolsado en un máximo de 2 días hábiles.</p>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/fuel" className="text-2xl px-6 py-3 rounded-md bg-white border border-gris-medio hover:bg-gris-medio/20 text-vino">Nueva operación</Link>
          <Link href="/" className="text-2xl px-6 py-3 rounded-md bg-white border border-gris-medio hover:bg-gris-medio/20 text-vino">Cancelar</Link>
        </div>
      </main>
    </div>
  );
}

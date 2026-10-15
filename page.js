import Link from "next/link";
import { Wrench, ShoppingBag, Lock } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-zinc-950">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
        Tienda & Servicio Técnico
      </h1>
      <p className="text-zinc-400 max-w-md mb-8 text-sm md:text-base">
        Próximamente: Catálogo de juegos, consolas y agendamiento de citas (Módulo 2).
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/admin"
          className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition"
        >
          <Lock className="w-4 h-4" /> Entrar al Panel de Finanzas (Módulo 1)
        </Link>
      </div>
    </div>
  );
}
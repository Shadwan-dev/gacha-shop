import Link from "next/link";
import { listProductsUseCase } from "@/core/infrastructure/di/server";
import { ProductCard } from "@/components/ProductCard";

export default async function HomePage() {
  const products = await listProductsUseCase.execute();

  return (
    <main>
      {/* Hero */}
      <section className="mb-8 rounded-3xl border border-gacha-border/60 bg-gacha-surface/60 p-5 text-center backdrop-blur md:mb-12 md:p-12">
        <p className="text-xs uppercase tracking-[0.3em] text-gacha-cyan">
          Catálogo 2026
        </p>
        <h1 className="mt-3 text-2xl font-black tracking-tight text-secondary-50 md:text-5xl">
          Equipa tu día a día con{" "}
          <span className="text-gacha-gold">estilo</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-secondary-400 md:mt-4 md:text-base">
          Electrónica, electrodomésticos y accesorios seleccionados. Cada
          producto tiene un nivel de exclusividad asignado por nuestros gestores.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center md:mt-6 md:gap-3">
          <Link href="#catalogo" className="btn-gold w-full justify-center sm:w-auto">
            Ver catálogo
          </Link>
          <Link href="/login" className="btn-ghost w-full justify-center sm:w-auto">
            Acceso gestores
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section id="catalogo" className="scroll-mt-24">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold text-secondary-50">
            Productos destacados
          </h2>
          <span className="text-sm text-secondary-400">
            {products.length} artículo{products.length === 1 ? "" : "s"}
          </span>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gacha-border p-12 text-center">
            <p className="text-4xl">✦</p>
            <h3 className="mt-3 text-lg font-semibold text-secondary-200">
              Aún no hay productos
            </h3>
            <p className="mt-1 text-sm text-secondary-400">
              El administrador todavía no ha añadido ninguno.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
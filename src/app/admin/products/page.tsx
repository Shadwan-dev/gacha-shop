import { redirect } from "next/navigation";
import { listProductsUseCase, getCurrentUserUseCase, sessionService } from "@/core/infrastructure/di/server";
import { createProductAction } from "./actions";
import { StarRating } from "@/components/StarRating";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const userId = await sessionService.get();
  if (!userId) redirect("/login");
  const user = await getCurrentUserUseCase.execute(userId);
  if (!user || user.role !== "MASTER") redirect("/login");

  const { error, ok } = await searchParams;
  const products = await listProductsUseCase.execute();

  return (
    <main className="space-y-8">
      <header>
        <h1 className="text-3xl font-black text-secondary-50">
          Panel <span className="text-gacha-gold">MASTER</span>
        </h1>
        <p className="mt-1 text-secondary-400">Crea nuevas reliquias y gestiona la tienda.</p>
      </header>

      {error && <p className="rounded-lg border border-gacha-danger/40 bg-gacha-danger/10 p-3 text-gacha-danger">{error}</p>}
      {ok && <p className="rounded-lg border border-gacha-cyan/40 bg-gacha-cyan/10 p-3 text-gacha-cyan">{ok}</p>}

      <section className="rounded-2xl border border-gacha-border bg-gacha-surface/70 p-6">
        <h2 className="mb-4 text-lg font-semibold text-secondary-100">Nueva reliquia</h2>
        <form action={createProductAction} className="grid gap-4 md:grid-cols-2">
          <input name="name" required placeholder="Nombre" className="rounded-lg border border-gacha-border bg-gacha-bg px-3 py-2 text-secondary-100 outline-none focus:border-gacha-gold" />
          <input name="price" required type="number" step="0.01" min="0" placeholder="Precio" className="rounded-lg border border-gacha-border bg-gacha-bg px-3 py-2 text-secondary-100 outline-none focus:border-gacha-gold" />
          <input name="description" placeholder="Descripción" className="md:col-span-2 rounded-lg border border-gacha-border bg-gacha-bg px-3 py-2 text-secondary-100 outline-none focus:border-gacha-gold" />
          <select
  name="category"
  defaultValue="ELECTRONICA"
  className="rounded-lg border border-gacha-border bg-gacha-bg px-3 py-2 text-secondary-100 outline-none focus:border-gacha-gold"
>
  <option value="ELECTRONICA">Electrónica</option>
  <option value="ELECTRODOMESTICOS">Electrodomésticos</option>
  <option value="CALZADO">Calzado</option>
  <option value="ACCESORIOS">Accesorios</option>
  <option value="ROPA">Ropa</option>
  <option value="OTROS">Otros</option>
</select>
          <button type="submit" className="btn-gold">Crear reliquia</button>
        </form>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-secondary-100">Reliquias existentes</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.id} className="gacha-card" data-rarity={p.rarity}>
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-secondary-50">{p.name}</h3>
                <span className="gacha-badge">★ {p.rarity}</span>
              </div>
              <p className="mt-1 text-sm text-secondary-400">{p.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <StarRating value={p.rarity} size="sm" />
                <span className="font-bold text-gacha-gold">${p.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
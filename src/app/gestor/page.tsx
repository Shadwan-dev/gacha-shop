import { redirect } from "next/navigation";
import { listProductsUseCase, getCurrentUserUseCase, sessionService } from "@/core/infrastructure/di/server";
import { updateRarityAction } from "./actions";
import { StarRating } from "@/components/StarRating";

export default async function GestorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const userId = await sessionService.get();
  if (!userId) redirect("/login");
  const user = await getCurrentUserUseCase.execute(userId);
  if (!user || user.role !== "GESTOR") redirect("/login");

  const { error, ok } = await searchParams;
  const products = await listProductsUseCase.execute();

  return (
    <main className="space-y-8">
      <header>
        <h1 className="text-3xl font-black text-secondary-50">
          Panel <span className="text-gacha-cyan">GESTOR</span>
        </h1>
        <p className="mt-1 text-secondary-400">Asigna la rareza (estrellas) de cada reliquia.</p>
      </header>

      {error && <p className="rounded-lg border border-gacha-danger/40 bg-gacha-danger/10 p-3 text-gacha-danger">{error}</p>}
      {ok && <p className="rounded-lg border border-gacha-cyan/40 bg-gacha-cyan/10 p-3 text-gacha-cyan">{ok}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="gacha-card" data-rarity={p.rarity}>
            <h3 className="font-semibold text-secondary-50">{p.name}</h3>
            <p className="mt-1 text-sm text-secondary-400">{p.description}</p>
            <div className="mt-3">
              <StarRating value={p.rarity} size="sm" />
            </div>
            <form action={updateRarityAction} className="mt-3 flex items-center gap-2">
              <input type="hidden" name="productId" value={p.id} />
              <select name="rarity" defaultValue={p.rarity} className="flex-1 rounded-lg border border-gacha-border bg-gacha-bg px-3 py-2 text-secondary-100 outline-none focus:border-gacha-gold">
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} estrella{n > 1 ? "s" : ""}</option>
                ))}
              </select>
              <button type="submit" className="btn-ghost">Actualizar</button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
import Link from "next/link";
import { CartView } from "@/components/CartView";

export default function CartPage() {
  return (
    <main className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black text-secondary-50 md:text-3xl">
            Tu carrito
          </h1>
          <p className="mt-1 text-sm text-secondary-400">
            Revisa tus artículos antes de finalizar la compra.
          </p>
        </div>
        <Link
          href="/#catalogo"
          className="hidden text-sm font-medium text-gacha-cyan hover:text-gacha-gold md:inline"
        >
          ← Seguir comprando
        </Link>
      </header>

      <CartView />
    </main>
  );
}
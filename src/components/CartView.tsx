"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/state/cart-context";
import { CartItemCard } from "@/components/CartItemCard";

export function CartView() {
  const { items, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gacha-border p-12 text-center">
        <ShoppingBag className="mx-auto text-secondary-500" size={40} />
        <h2 className="mt-4 text-lg font-semibold text-secondary-200">
          Tu carrito está vacío
        </h2>
        <p className="mt-1 text-sm text-secondary-400">
          Añade productos desde el catálogo para empezar.
        </p>
        <Link href="/" className="btn-gold mt-6 inline-flex">
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Columna izquierda: cards */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-secondary-400">
            {itemCount} artículo{itemCount === 1 ? "" : "s"} en el carrito
          </p>
          <Link
            href="/#catalogo"
            className="text-sm font-medium text-gacha-cyan hover:text-gacha-gold md:hidden"
          >
            ← Seguir comprando
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <CartItemCard key={item.product.id} item={item} />
          ))}
        </div>
      </section>

      {/* Columna derecha: resumen sticky (desktop) */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-gacha-border bg-gacha-surface/80 p-5 backdrop-blur">
          <h2 className="text-lg font-bold text-secondary-50">Resumen</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-secondary-300">
              <dt>Artículos</dt>
              <dd>{itemCount}</dd>
            </div>
            <div className="flex justify-between text-secondary-300">
              <dt>Envío</dt>
              <dd className="text-gacha-cyan">Gratis</dd>
            </div>
            <div className="flex justify-between border-t border-gacha-border/60 pt-3 text-base font-bold text-secondary-50">
              <dt>Total</dt>
              <dd className="text-gacha-gold">${total.toFixed(2)}</dd>
            </div>
          </dl>

          <Link
            href="/checkout"
            className="btn-gold mt-5 w-full"
          >
            Finalizar compra
          </Link>

          <p className="mt-3 text-center text-xs text-secondary-500">
            Pago seguro · Envío en 24–48h
          </p>
        </div>
      </aside>

      {/* Barra sticky inferior (móvil) */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gacha-border bg-gacha-bg/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-secondary-500">
              Total
            </p>
            <p className="text-lg font-bold text-gacha-gold">
              ${total.toFixed(2)}
            </p>
          </div>
          <Link href="/checkout" className="btn-gold flex-1 justify-center">
            Finalizar compra
          </Link>
        </div>
      </div>

      {/* Espacio para que la barra sticky no tape la última card */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
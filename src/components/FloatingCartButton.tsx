"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/state/cart-context";

export function FloatingCartButton() {
  const { itemCount, total } = useCart();
  if (itemCount === 0) return null;

  return (
    <Link
      href="/cart"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-gacha-gold px-4 py-3 font-bold text-gacha-bg shadow-lg shadow-gacha-gold/30 md:hidden"
      aria-label={`Ir al carrito, ${itemCount} artículos`}
    >
      <ShoppingCart size={18} />
      <span>{itemCount}</span>
      <span className="text-sm">${total.toFixed(2)}</span>
    </Link>
  );
}
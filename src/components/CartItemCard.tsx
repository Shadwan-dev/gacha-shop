"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/state/cart-context";
import { StarRating } from "@/components/StarRating";
import type { CartItem } from "@/core/domain/model/CartItem";

const CATEGORY_LABEL: Record<CartItem["product"]["category"], string> = {
  ELECTRONICA: "Electrónica",
  ELECTRODOMESTICOS: "Electrodomésticos",
  CALZADO: "Calzado",
  ACCESORIOS: "Accesorios",
  ROPA: "Ropa",
  OTROS: "Otros",
};

export function CartItemCard({ item }: { item: CartItem }) {
  const { increment, decrement, removeItem } = useCart();
  const { product, quantity } = item;
  const subtotal = product.price * quantity;

  return (
    <article
      className="gacha-card flex flex-col p-3 sm:p-4"
      data-rarity={product.rarity}
    >
      {/* Cabecera: categoría + rareza */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10px] uppercase tracking-widest text-gacha-cyan sm:text-[11px]">
          {CATEGORY_LABEL[product.category]}
        </span>
        <span className="gacha-badge shrink-0 text-[10px] sm:text-xs">
          ★ {product.rarity}
        </span>
      </div>

      {/* Nombre */}
      <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-tight text-secondary-50 sm:text-base">
        {product.name}
      </h3>

      {/* Estrellas + precio unitario */}
      <div className="mt-2 flex items-center justify-between">
        <StarRating value={product.rarity} size="sm" />
        <span className="text-xs text-secondary-400">
          ${product.price.toFixed(2)} c/u
        </span>
      </div>

      {/* Controles de cantidad */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 rounded-lg border border-gacha-border bg-gacha-bg/60 p-1">
          <button
            type="button"
            onClick={() => decrement(product.id)}
            aria-label="Quitar una unidad"
            className="flex h-7 w-7 items-center justify-center rounded-md text-secondary-300 transition-colors hover:bg-white/5 hover:text-gacha-gold"
          >
            <Minus size={14} />
          </button>
          <span className="min-w-[1.5rem] text-center text-sm font-semibold text-secondary-100">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => increment(product.id)}
            aria-label="Añadir una unidad"
            className="flex h-7 w-7 items-center justify-center rounded-md text-secondary-300 transition-colors hover:bg-white/5 hover:text-gacha-gold"
          >
            <Plus size={14} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => removeItem(product.id)}
          aria-label="Eliminar del carrito"
          className="flex h-7 w-7 items-center justify-center rounded-md text-secondary-500 transition-colors hover:bg-gacha-danger/10 hover:text-gacha-danger"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Subtotal */}
      <div className="mt-3 flex items-center justify-between border-t border-gacha-border/60 pt-2">
        <span className="text-[11px] uppercase tracking-widest text-secondary-500">
          Subtotal
        </span>
        <span className="text-sm font-bold text-gacha-gold sm:text-base">
          ${subtotal.toFixed(2)}
        </span>
      </div>
    </article>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/state/cart-context";
import type { Product } from "@/core/domain/model/Product";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    addItem(product);
    setAdded(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), 1000);
  };

  // Limpia el timeout si el componente se desmonta antes de tiempo
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <button
  type="button"
  onClick={handleClick}
  aria-live="polite"
  className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] sm:py-2 ${
    added
      ? "bg-gacha-cyan/20 text-gacha-cyan ring-1 ring-gacha-cyan/60"
      : "bg-primary-600 text-white hover:bg-primary-700"
  }`}
>
  {added ? (
    <>
      <Check size={18} /> Agregado
    </>
  ) : (
    <>
      <Plus size={18} /> Añadir al carrito
    </>
  )}
</button>
  );
}
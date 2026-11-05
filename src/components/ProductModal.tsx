"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import { StarRating } from "@/components/StarRating";
import { AddToCartButton } from "@/components/AddToCartButton";
import type { Product } from "@/core/domain/model/Product";

const CATEGORY_LABEL: Record<Product["category"], string> = {
  ELECTRONICA: "Electrónica",
  ELECTRODOMESTICOS: "Electrodomésticos",
  CALZADO: "Calzado",
  ACCESORIOS: "Accesorios",
  ROPA: "Ropa",
  OTROS: "Otros",
};

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  // Cierra con Escape
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  // Bloquea el scroll del body mientras el modal está abierto
  useEffect(() => {
    if (!product) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [product]);

  if (!product) return null;

  // Renderiza en <body> para escapar de cualquier stacking context
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-t-2xl border border-gacha-border bg-gacha-surface shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()} // 👈 evita que el click dentro cierre el modal
      >
        {/* Imagen */}
        <div className="relative h-56 w-full sm:h-64">
          <Image
            src={product.imageUrl || "/products/placeholder.jpg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 512px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gacha-surface via-gacha-surface/30 to-transparent" />

          {/* Botón cerrar */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-secondary-100 backdrop-blur transition-colors hover:bg-black/80"
          >
            <X size={18} />
          </button>

          {/* Badge rareza */}
          <span
            className="absolute left-3 top-3 gacha-badge"
            data-rarity={product.rarity}
          >
            ★ {product.rarity}
          </span>
        </div>

        {/* Contenido */}
        <div className="p-5 sm:p-6">
          <span className="text-[11px] uppercase tracking-widest text-gacha-cyan">
            {CATEGORY_LABEL[product.category]}
          </span>
          <h2
            id="product-modal-title"
            className="mt-1 text-xl font-bold text-secondary-50 sm:text-2xl"
          >
            {product.name}
          </h2>

          <div className="mt-2 flex items-center justify-between">
            <StarRating value={product.rarity} />
            <span className="text-2xl font-black text-gacha-gold">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Descripción completa */}
          <p className="mt-4 text-sm leading-relaxed text-secondary-300">
            {product.description || "Sin descripción disponible."}
          </p>

          {/* CTA */}
          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
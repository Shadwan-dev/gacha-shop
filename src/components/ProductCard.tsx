"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/core/domain/model/Product";
import { StarRating } from "@/components/StarRating";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductModal } from "@/components/ProductModal";

const CATEGORY_LABEL: Record<Product["category"], string> = {
  ELECTRONICA: "Electrónica",
  ELECTRODOMESTICOS: "Electrodomésticos",
  CALZADO: "Calzado",
  ACCESORIOS: "Accesorios",
  ROPA: "Ropa",
  OTROS: "Otros",
};

export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article
        className="gacha-card group flex h-full cursor-pointer flex-col"
        data-rarity={product.rarity}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={`Ver detalles de ${product.name}`}
      >
        {/* Imagen — más alta en móvil */}
        <div className="relative -mx-3 -mt-3 mb-3 h-48 overflow-hidden rounded-t-2xl sm:-mx-4 sm:-mt-4 sm:h-44">
          <Image
            src={product.imageUrl || "/products/placeholder.jpg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gacha-surface via-gacha-surface/20 to-transparent" />
        </div>

        {/* Cabecera */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-widest text-gacha-cyan sm:text-[11px]">
              {CATEGORY_LABEL[product.category]}
            </span>
            <h2 className="mt-1 line-clamp-2 text-base font-semibold leading-tight text-secondary-50 sm:text-sm md:text-base">
              {product.name}
            </h2>
          </div>
          <span className="gacha-badge shrink-0 text-xs">
            ★ {product.rarity}
          </span>
        </div>

        {/* Estrellas + precio — apilados en móvil */}
        <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <StarRating value={product.rarity} size="sm" />
          <p className="text-lg font-bold text-gacha-gold sm:text-base md:text-lg">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* CTA — al fondo con mt-auto */}
        <div
          className="mt-auto pt-3"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <AddToCartButton product={product} />
        </div>
      </article>

      <ProductModal product={open ? product : null} onClose={() => setOpen(false)} />
    </>
  );
}
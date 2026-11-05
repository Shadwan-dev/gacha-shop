"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { CartItem } from "@/core/domain/model/CartItem";
import type { Product } from "@/core/domain/model/Product";

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  increment: (productId: string) => void;   // 👈 NUEVO
  decrement: (productId: string) => void;   // 👈 NUEVO
  clear: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Cargar desde localStorage al montar
  useEffect(() => {
    const raw = localStorage.getItem("cart");
    if (raw) setItems(JSON.parse(raw));
  }, []);

  // Persistir en cada cambio
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const increment = (productId: string) => {
  setItems((prev) =>
    prev.map((i) =>
      i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i
    )
  );
};

const decrement = (productId: string) => {
  setItems((prev) =>
    prev
      .map((i) =>
        i.product.id === productId
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
      .filter((i) => i.quantity > 0)  // si llega a 0, se elimina
  );
};

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const clear = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, increment, decrement, clear, total, itemCount  }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/state/cart-context";
import { submitOrderAction } from "./actions";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await submitOrderAction({ items, customer: form });
      clear();
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar el pedido");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return <p className="p-8">No hay artículos en el carrito.</p>;
  }

  return (
    <main className="mx-auto max-w-lg p-8">
      <h1 className="mb-6 text-2xl font-bold text-primary-700">Finalizar compra</h1>
      <p className="mb-4 text-secondary-700">Total: ${total.toFixed(2)}</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        {(["fullName", "email", "phone", "address"] as const).map((field) => (
          <input
            key={field}
            required
            type={field === "email" ? "email" : "text"}
            placeholder={
              field === "fullName" ? "Nombre completo"
              : field === "email" ? "Email"
              : field === "phone" ? "Teléfono"
              : "Dirección"
            }
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full rounded border border-secondary-300 px-3 py-2"
          />
        ))}

        {error && <p className="text-danger-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Confirmar pedido"}
        </button>
      </form>
    </main>
  );
}
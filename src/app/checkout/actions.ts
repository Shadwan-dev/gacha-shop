"use server";

import { submitOrderUseCase } from "@/core/infrastructure/di/server";
import type { Order } from "@/core/domain/model/Order";
import type { CartItem } from "@/core/domain/model/CartItem";

interface CheckoutPayload {
  items: CartItem[];
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
}

export async function submitOrderAction(payload: CheckoutPayload) {
  const order: Order = {
    id: crypto.randomUUID(),
    items: payload.items,
    customer: payload.customer,
    total: payload.items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    createdAt: new Date(),
  };

  await submitOrderUseCase.execute(order);
  return { ok: true, orderId: order.id };
}
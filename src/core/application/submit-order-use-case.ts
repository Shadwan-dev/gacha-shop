import type { Order } from "@/core/domain/model/Order";
import type { SalesChannel } from "@/core/domain/repository/SalesChannel";

export class SubmitOrderUseCase {
  constructor(private readonly channels: SalesChannel[]) {}

  async execute(order: Order): Promise<void> {
    if (order.items.length === 0) {
      throw new Error("El pedido no tiene artículos");
    }
    if (!order.customer.email || !order.customer.fullName) {
      throw new Error("Faltan datos personales mínimos");
    }

    // Envía a todos los gestores en paralelo
    await Promise.all(this.channels.map((channel) => channel.send(order)));
  }
}
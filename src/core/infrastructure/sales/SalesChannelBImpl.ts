import type { Order } from "@/core/domain/model/Order";
import type { SalesChannel } from "@/core/domain/repository/SalesChannel";

export class SalesChannelBImpl implements SalesChannel {
  readonly name = "Gestor B (webhook)";

  async send(order: Order): Promise<void> {
    // Simulación. En real: fetch al webhook del gestor B
    console.log(`[Gestor B] Pedido ${order.id} recibido:`, order);
  }
}
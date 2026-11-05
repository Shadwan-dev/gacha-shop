import type { Order } from "@/core/domain/model/Order";
import type { SalesChannel } from "@/core/domain/repository/SalesChannel";

export class SalesChannelAImpl implements SalesChannel {
  readonly name = "Gestor A (email)";

  async send(order: Order): Promise<void> {
    // Simulación. En real: fetch a la API del gestor A
    console.log(`[Gestor A] Pedido ${order.id} recibido:`, order);
  }
}
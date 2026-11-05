import type { Order } from "@/core/domain/model/Order";

/**
 * Contrato que deben cumplir TODOS los gestores de venta.
 * El core no sabe cuántos hay ni cómo funcionan por dentro.
 */
export interface SalesChannel {
  readonly name: string;
  send(order: Order): Promise<void>;
}
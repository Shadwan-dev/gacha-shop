import type { Product, Rarity } from "@/core/domain/model/Product";
import type { ProductRepository } from "@/core/domain/repository/ProductRepository";
import type { UserRole } from "@/core/domain/model/User";

interface UpdateRarityInput {
  productId: string;
  rarity: Rarity;
  actorRole: UserRole;
}

export class UpdateProductRarityUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(input: UpdateRarityInput): Promise<Product> {
    // Regla: MASTER y GESTOR pueden asignar estrellas
    if (input.actorRole !== "MASTER" && input.actorRole !== "GESTOR") {
      throw new Error("No tienes permiso para asignar estrellas");
    }
    if (input.rarity < 1 || input.rarity > 5) {
      throw new Error("La rareza debe estar entre 1 y 5");
    }

    const existing = await this.repository.findById(input.productId);
    if (!existing) throw new Error("Producto no encontrado");

    return this.repository.updateRarity(input.productId, input.rarity);
  }
}
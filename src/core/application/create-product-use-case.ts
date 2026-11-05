import type { Category, Product, Rarity } from "@/core/domain/model/Product";
import type { ProductRepository } from "@/core/domain/repository/ProductRepository";
import type { UserRole } from "@/core/domain/model/User";

interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  rarity: Rarity;
  category: Category;         // 👈 tipado correcto, no string
  actorRole: UserRole;
}

const VALID_CATEGORIES: readonly Category[] = [
  "ELECTRONICA",
  "CALZADO",
  "ACCESORIOS",
  "ROPA",
  "OTROS",
];

export class CreateProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(input: CreateProductInput): Promise<Product> {
    if (input.actorRole !== "MASTER") {
      throw new Error("Solo el administrador puede crear productos");
    }
    if (!input.name.trim()) {
      throw new Error("El nombre es obligatorio");
    }
    if (input.price < 0) {
      throw new Error("El precio no puede ser negativo");
    }
    if (input.rarity < 1 || input.rarity > 5) {
      throw new Error("La rareza debe estar entre 1 y 5");
    }
    if (!VALID_CATEGORIES.includes(input.category)) {
      throw new Error("Categoría inválida");
    }

    return this.repository.create({
      name: input.name.trim(),
      description: input.description?.trim(),
      price: input.price,
      rarity: input.rarity,
      category: input.category,
    });
  }
}
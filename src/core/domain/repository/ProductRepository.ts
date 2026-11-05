import type { Product } from "@/core/domain/model/Product";

export interface ProductRepository {
  listAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(input: Omit<Product, "id" | "createdAt">): Promise<Product>;
  updateRarity(id: string, rarity: Product["rarity"]): Promise<Product>;
}
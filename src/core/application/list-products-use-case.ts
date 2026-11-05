import type { Product } from "@/core/domain/model/Product";
import type { ProductRepository } from "@/core/domain/repository/ProductRepository";

export class ListProductsUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.repository.listAll();
  }
}
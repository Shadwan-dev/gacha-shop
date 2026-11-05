export type Rarity = 1 | 2 | 3 | 4 | 5;

export type Category =
  | "ELECTRONICA"
  | "ELECTRODOMESTICOS"
  | "CALZADO"
  | "ACCESORIOS"
  | "ROPA"
  | "OTROS";

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  rarity: Rarity;
  category: Category;
  createdAt: Date;
}
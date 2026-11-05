import type { CartItem } from "./CartItem";
import type { CustomerInfo } from "./CustomerInfo";

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  total: number;
  createdAt: Date;
}
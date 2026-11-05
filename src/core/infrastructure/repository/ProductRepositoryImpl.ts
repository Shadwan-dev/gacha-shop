import "server-only";
import { randomUUID } from "crypto";
import type { Product, Rarity } from "@/core/domain/model/Product";
import type { ProductRepository } from "@/core/domain/repository/ProductRepository";

const PRODUCTS: Product[] = [
  {
    id: randomUUID(),
    name: "Batería 72V 35Ah Lithium + Cargador (Kit)",
    description:
      "Kit completo de batería de litio 72V 35Ah con cargador incluido. Ideal para scooters eléctricos y vehículos de alta demanda. Autonomía extendida y ciclos de carga prolongados.",
    price: 899.0,
    rarity: 5,
    category: "ELECTRONICA",
    imageUrl: "/products/BATERÍA 72V 35AH LITHIUM+CARGADOR-KIT.jpg",
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Batería LiFePO4 24V 100Ah",
    description:
      "Batería de litio LiFePO4 de 24V y 100Ah. Química segura y estable, ideal para sistemas solares, respaldo de energía y aplicaciones de ciclo profundo. Larga vida útil.",
    price: 449.5,
    rarity: 5,
    category: "ELECTRONICA",
    imageUrl: "/products/Batería-de-litio LiFePO4 24 V 100 Ah.jpg",
    createdAt: new Date(),
  },
  {
  id: randomUUID(),
  name: "Multímetro Digital ANENG SZ856",
  description:
    "Multímetro digital de 6000 cuentas con medición de voltaje AC/DC, corriente, resistencia, capacitancia y frecuencia. Incluye detección NCV (sin contacto) y medición de temperatura. Ideal para técnicos, electricistas y aficionados a la electrónica.",
  price: 39.99,
  rarity: 4,
  category: "ELECTRONICA",
  imageUrl: "/products/multimetro.jpg",
  createdAt: new Date(),
},

  {
    id: randomUUID(),
    name: "Batería de Litio 3Ah",
    description:
      "Batería de litio compacta de 3Ah. Perfecta para dispositivos portátiles, linternas y equipos de bajo consumo. Ligera y recargable.",
    price: 4.99,
    rarity: 2,
    category: "ELECTRONICA",
    imageUrl: "/products/bateria-litio-3ah.jpg",
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Inversor Sunry 3.6kW",
    description:
      "Inversor de onda pura Sunry de 3.6kW. Convierte corriente continua en alterna con alta eficiencia. Ideal para instalaciones solares y respaldo eléctrico del hogar.",
    price: 479.0,
    rarity: 4,
    category: "ELECTRONICA",
    imageUrl: "/products/inversor 3,6kw sunry.jpg",
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Mouse Gamer",
    description:
      "Mouse gamer ergonómico con sensor de alta precisión, iluminación RGB y botones programables. Diseñado para sesiones intensas de juego.",
    price: 34.9,
    rarity: 3,
    category: "ELECTRONICA",
    imageUrl: "/products/mouse-gamer.jpg",
    createdAt: new Date(),
  },
  {
  id: randomUUID(),
  name: "Horno Eléctrico Smart Air Fryer 28L HD",
  description:
    "Horno eléctrico digital de 28 litros con tecnología Air Fryer y pantalla HD. Alcance hasta 230 °C, cocción uniforme y bajo consumo de aceite. Ideal para hornear, freír, asar y gratinar con resultados profesionales en casa.",
  price: 149.9,
  rarity: 5,
  category: "ELECTRODOMESTICOS",
  imageUrl: "/products/horno-electrico.jpg",
  createdAt: new Date(),
},
{
  id: randomUUID(),
  name: "Lavadora Semiautomática DAYTRON 8kg Doble Tina",
  description:
    "Lavadora semiautomática DAYTRON de 8 kg con doble tina: un compartimento para lavar y otro para centrifugar. Control manual sencillo, bajo consumo de agua y energía. Ideal para hogares que buscan eficiencia sin complicaciones.",
  price: 229.9,
  rarity: 5,
  category: "ELECTRODOMESTICOS",
  imageUrl: "/products/lavadora-semiautomatica.jpg",
  createdAt: new Date(),
},
  {
    id: randomUUID(),
    name: "Toallitas Húmedas (120 uds)",
    description:
      "Pack de 120 toallitas húmedas multiuso. Suaves, resistentes y con fórmula hipoalergénica. Prácticas para el hogar, viaje o cuidado personal.",
    price: 4.5,
    rarity: 1,
    category: "OTROS",
    imageUrl: "/products/toallitas-humedas-120.jpg",
    createdAt: new Date(),
  },
  {
    id: randomUUID(),
    name: "Toallitas Sanitarias",
    description:
      "Toallitas sanitarias de uso diario. Suaves con la piel, alta absorción y diseño discreto. Pack cómodo para llevar.",
    price: 3.99,
    rarity: 1,
    category: "OTROS",
    imageUrl: "/products/toallitas-sanitarias.jpg",
    createdAt: new Date(),
  },
];

export class ProductRepositoryImpl implements ProductRepository {
  async listAll(): Promise<Product[]> {
    return [...PRODUCTS];
  }

  async findById(id: string): Promise<Product | null> {
    return PRODUCTS.find((p) => p.id === id) ?? null;
  }

  async create(input: Omit<Product, "id" | "createdAt">): Promise<Product> {
    const product: Product = { ...input, id: randomUUID(), createdAt: new Date() };
    PRODUCTS.push(product);
    return product;
  }

  async updateRarity(id: string, rarity: Rarity): Promise<Product> {
    const idx = PRODUCTS.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Producto no encontrado");
    PRODUCTS[idx] = { ...PRODUCTS[idx], rarity };
    return PRODUCTS[idx];
  }
}
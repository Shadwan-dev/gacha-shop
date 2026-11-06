# 🎴 Gacha Shop — Clean Architecture + Next.js

Mini tienda online con estética **gacha** (tarjetas con rareza por estrellas) construida con **Next.js 16**, **React 19**, **TypeScript** y **Tailwind CSS 3**, aplicando **Clean Architecture** de forma estricta: la lógica de negocio no conoce React, Next.js ni la base de datos.

> Proyecto de aprendizaje. No usar en producción sin antes firmar cookies con JWT, persistir pedidos y añadir rate limiting en login.

---

## ✨ Características

- 🛍️ **Catálogo de productos** con estética gacha: cards con borde y glow según rareza (1★–5★).
- 🔍 **Modal de detalle** por producto con descripción completa, estrellas y CTA.
- 🛒 **Carrito persistente** en `localStorage` con contador en el navbar y feedback "Agregado" al añadir.
- 📱 **Mobile-first**: navbar con drawer, grid 1 col en móvil, botón táctil de 48px, barra sticky de checkout.
- 🔐 **Autenticación por roles**:
  - `MASTER` (admin): crea productos y asigna categoría, precio y rareza.
  - `GESTOR`: solo asigna la rareza (estrellas) de los productos existentes.
- ⭐ **Sistema de estrellas** (1–5) como "nivel de exclusividad" asignado por gestores.
- 🧱 **Clean Architecture**: dominio, aplicación, infraestructura y presentación separados.
- 🔒 **Credenciales en `.env.local`** hasheadas en runtime con bcrypt. Nunca en el código.
- 🌙 **Diseño oscuro** con acentos dorado/cian y tipografía Inter.

---

## 🧱 Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 3.4, lucide-react |
| Lenguaje | TypeScript 5.9 (strict) |
| Auth | bcryptjs + cookie `httpOnly` |
| Estado | React Context + `localStorage` |
| Linting | ESLint + `eslint-config-next` |

---

## 📁 Estructura del proyecto

```text
src/
├── app/                          # 🖥️ Presentación (Next App Router)
│   ├── layout.tsx                # Layout con Navbar + CartProvider
│   ├── page.tsx                  # Home: hero + catálogo
│   ├── login/                    # Login (Server Action)
│   ├── admin/products/           # Panel MASTER: crear productos
│   ├── gestor/                   # Panel GESTOR: asignar estrellas
│   ├── cart/                     # Carrito
│   └── api/auth/logout/          # Logout (Route Handler)
│
├── core/                         # 🧠 Negocio (agnóstico a Next/React)
│   ├── domain/
│   │   ├── model/                # Product, User, CartItem, Order, CustomerInfo
│   │   └── repository/           # Interfaces: ProductRepository, UserRepository, PasswordHasher, SalesChannel
│   ├── application/              # Casos de uso
│   │   ├── list-products-use-case.ts
│   │   ├── create-product-use-case.ts
│   │   ├── update-product-rarity-use-case.ts
│   │   ├── login-use-case.ts
│   │   ├── get-current-user-use-case.ts
│   │   └── submit-order-use-case.ts
│   └── infrastructure/
│       ├── repository/           # Implementaciones (ProductRepositoryImpl, UserRepositoryImpl)
│       ├── auth/                 # PasswordHasherImpl, SessionServiceImpl
│       ├── sales/                # SalesChannelAImpl, SalesChannelBImpl
│       └── di/server.ts          # Composition Root
│
├── components/                   # UI reutilizable
│   ├── Navbar.tsx                # Responsive + badge carrito
│   ├── ProductCard.tsx           # Card gacha con modal
│   ├── ProductModal.tsx          # Modal de detalle
│   ├── CartItemCard.tsx          # Card mini en /cart
│   ├── CartView.tsx              # Grid + resumen sticky
│   ├── StarRating.tsx            # Estrellas (readonly o interactivo)
│   └── AddToCartButton.tsx       # Feedback "Agregado" 1s
│
├── state/
│   └── cart-context.tsx          # Estado del carrito (Context + localStorage)
│
└── middleware.ts                 # Protege /admin, /gestor, /checkout
import type { Metadata } from "next";
import { CartProvider } from "@/state/cart-context";
import { Navbar } from "@/components/Navbar";
import {
  getCurrentUserUseCase,
  sessionService,
} from "@/core/infrastructure/di/server";
import "./globals.css";
import { FloatingCartButton } from "@/components/FloatingCartButton";

export const metadata: Metadata = {
  title: "Gacha Shop",
  description: "Tienda variada con estética gacha y Clean Architecture",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const userId = await sessionService.get();
  const user = userId ? await getCurrentUserUseCase.execute(userId) : null;

  return (
    <html lang="es">
      <body className="min-h-screen text-secondary-100 antialiased">
        <CartProvider>
          <Navbar
            user={user ? { username: user.username, role: user.role } : null}
          />
          <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
            {children}
          </div>
          <FloatingCartButton />
          <footer className="mt-16 border-t border-gacha-border/60 py-6 text-center text-sm text-secondary-400">
            Gacha Shop · All rights reserved 2026 
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
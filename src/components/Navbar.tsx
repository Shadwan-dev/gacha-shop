"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, User, LayoutDashboard } from "lucide-react";
import { useCart } from "@/state/cart-context";

export interface NavUser {
  username: string;
  role: "MASTER" | "GESTOR";
}

interface NavbarProps {
  user: NavUser | null;
}

const PUBLIC_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/#catalogo", label: "Catálogo" },
];

/** Badge numérico reutilizable */
function CartBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gacha-gold px-1 text-[10px] font-bold text-gacha-bg">
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function Navbar({ user }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const dashboardHref = user?.role === "MASTER" ? "/admin/products" : "/gestor";
  const dashboardLabel = user?.role === "MASTER" ? "Panel admin" : "Panel gestor";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gacha-border/60 bg-gacha-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl text-gacha-gold md:text-2xl">✦</span>
            <span className="text-sm font-bold tracking-wide text-gacha-gold md:text-lg">
              GACHA SHOP
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {PUBLIC_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-secondary-300 transition-colors hover:text-gacha-gold"
              >
                {l.label}
              </Link>
            ))}
            {user && (
              <Link
                href={dashboardHref}
                className="text-sm font-medium text-gacha-cyan transition-colors hover:text-gacha-gold"
              >
                {dashboardLabel}
              </Link>
            )}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link href="/cart" className="btn-ghost relative">
              <ShoppingCart size={16} /> Carrito
              <CartBadge count={itemCount} />
            </Link>
            {user ? (
              <form action="/api/auth/logout" method="POST">
                <button type="submit" className="btn-ghost">
                  <User size={16} /> {user.username} · Salir
                </button>
              </form>
            ) : (
              <Link href="/login" className="btn-gold">
                Iniciar sesión
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="rounded-lg p-2 text-secondary-200 hover:bg-white/5 md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav className="absolute right-0 top-0 h-full w-4/5 max-w-xs border-l border-gacha-border bg-gacha-surface p-6 shadow-2xl">
            <p className="mb-4 text-xs uppercase tracking-widest text-secondary-500">
              Menú
            </p>
            <ul className="space-y-1">
              {PUBLIC_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base text-secondary-200 hover:bg-white/5"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              {user && (
                <li>
                  <Link
                    href={dashboardHref}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-3 text-base text-gacha-cyan hover:bg-white/5"
                  >
                    <LayoutDashboard size={18} /> {dashboardLabel}
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="relative flex items-center gap-2 rounded-lg px-3 py-3 text-base text-secondary-200 hover:bg-white/5"
                >
                  <span className="relative">
                    <ShoppingCart size={18} />
                    <CartBadge count={itemCount} />
                  </span>
                  Carrito
                  {itemCount > 0 && (
                    <span className="ml-auto rounded-full bg-gacha-gold/15 px-2 py-0.5 text-xs font-semibold text-gacha-gold">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>

            <div className="mt-6 border-t border-gacha-border pt-4">
              {user ? (
                <form action="/api/auth/logout" method="POST">
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-left text-base text-secondary-200 hover:bg-white/5"
                  >
                    <User size={18} /> {user.username} · Cerrar sesión
                  </button>
                </form>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="btn-gold w-full"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
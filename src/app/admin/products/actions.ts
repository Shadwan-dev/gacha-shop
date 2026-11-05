"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Category, Rarity } from "@/core/domain/model/Product";
import {
  createProductUseCase,
  getCurrentUserUseCase,
  sessionService,
} from "@/core/infrastructure/di/server";

async function requireUser() {
  const userId = await sessionService.get();
  if (!userId) redirect("/login");
  const user = await getCurrentUserUseCase.execute(userId);
  if (!user) redirect("/login");
  return user;
}

export async function createProductAction(formData: FormData) {
  const user = await requireUser();

  try {
    await createProductUseCase.execute({
      name: String(formData.get("name") ?? ""),
      description: String(formData.get("description") ?? ""),
      price: Number(formData.get("price") ?? 0),
      rarity: Number(formData.get("rarity") ?? 1) as Rarity,
      category: String(formData.get("category") ?? "OTROS") as Category,
      actorRole: user.role,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al crear";
    redirect(`/admin/products?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect("/admin/products?ok=Producto+creado");
}
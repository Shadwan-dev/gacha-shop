"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  updateProductRarityUseCase,
  getCurrentUserUseCase,
  sessionService,
} from "@/core/infrastructure/di/server";

export async function updateRarityAction(formData: FormData) {
  const userId = await sessionService.get();
  if (!userId) redirect("/login");
  const user = await getCurrentUserUseCase.execute(userId);
  if (!user) redirect("/login");

  const productId = String(formData.get("productId") ?? "");
  const rarity = Number(formData.get("rarity") ?? 1) as 1 | 2 | 3 | 4 | 5;

  try {
    await updateProductRarityUseCase.execute({
      productId,
      rarity,
      actorRole: user.role,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error";
    redirect(`/gestor?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/gestor");
  revalidatePath("/");
  redirect("/gestor?ok=Rareza+actualizada");
}
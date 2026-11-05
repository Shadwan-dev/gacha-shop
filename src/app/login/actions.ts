"use server";

import { redirect } from "next/navigation";
import { loginUseCase, sessionService } from "@/core/infrastructure/di/server";

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  let user;
  try {
    user = await loginUseCase.execute(username, password);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error de login";
    redirect(`/login?error=${encodeURIComponent(message)}`);
  }

  await sessionService.set(user.id);

  if (user.role === "MASTER") redirect("/admin");
  redirect("/gestor");
}
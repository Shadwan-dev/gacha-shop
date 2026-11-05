import { redirect } from "next/navigation";
import { getCurrentUserUseCase, sessionService } from "@/core/infrastructure/di/server";

export default async function AdminPage() {
  const userId = await sessionService.get();
  if (!userId) redirect("/login");

  const user = await getCurrentUserUseCase.execute(userId);
  if (!user || user.role !== "MASTER") redirect("/login");

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold text-primary-700">Panel MASTER</h1>
      <p className="mt-2 text-secondary-700">Bienvenido, {user.username}.</p>
      <p className="mt-4 text-sm text-secondary-500">
        Aquí irían: gestión de productos, listado de pedidos, gestión de gestores…
      </p>
    </main>
  );
}
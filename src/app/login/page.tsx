import { loginAction } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto max-w-sm">
      <div className="rounded-2xl border border-gacha-border bg-gacha-surface/80 p-8 backdrop-blur">
        <h1 className="mb-1 text-2xl font-bold text-secondary-50">
          Acceso al sistema
        </h1>
        <p className="mb-6 text-sm text-secondary-400">
          Identifícate para gestionar la tienda.
        </p>

        {error && (
          <p className="mb-4 rounded-lg border border-gacha-danger/40 bg-gacha-danger/10 p-3 text-sm text-gacha-danger">
            {error}
          </p>
        )}

        <form action={loginAction} className="space-y-4">
          <input
            name="username"
            required
            placeholder="Usuario"
            autoComplete="username"
            className="w-full rounded-lg border border-gacha-border bg-gacha-bg px-4 py-3 text-secondary-100 placeholder-secondary-500 outline-none focus:border-gacha-gold"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Contraseña"
            autoComplete="current-password"
            className="w-full rounded-lg border border-gacha-border bg-gacha-bg px-4 py-3 text-secondary-100 placeholder-secondary-500 outline-none focus:border-gacha-gold"
          />
          <button type="submit" className="btn-gold w-full">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
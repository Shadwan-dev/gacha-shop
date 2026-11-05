import "server-only";
import { cookies } from "next/headers";

const COOKIE_NAME = "session";
const MAX_AGE = 60 * 60 * 8; // 8 horas

export class SessionServiceImpl {
  async set(userId: string): Promise<void> {
    const store = await cookies();
    store.set(COOKIE_NAME, userId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: MAX_AGE,
    });
  }

  async get(): Promise<string | null> {
    const store = await cookies();
    return store.get(COOKIE_NAME)?.value ?? null;
  }

  async clear(): Promise<void> {
    const store = await cookies();
    store.delete(COOKIE_NAME);
  }
}
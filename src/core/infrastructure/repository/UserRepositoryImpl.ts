import "server-only";
import bcrypt from "bcryptjs";
import type { User } from "@/core/domain/model/User";
import type { UserRepository } from "@/core/domain/repository/UserRepository";

function buildUsers(): User[] {
  const masterUsername = process.env.MASTER_USERNAME;
  const masterPassword = process.env.MASTER_PASSWORD;
  const gestorUsername = process.env.GESTOR_USERNAME;
  const gestorPassword = process.env.GESTOR_PASSWORD;

  const missing: string[] = [];
  if (!masterUsername) missing.push("MASTER_USERNAME");
  if (!masterPassword) missing.push("MASTER_PASSWORD");
  if (!gestorUsername) missing.push("GESTOR_USERNAME");
  if (!gestorPassword) missing.push("GESTOR_PASSWORD");

  if (missing.length > 0) {
    throw new Error(
      `Faltan variables de entorno para credenciales: ${missing.join(", ")}. ` +
        `Revisa tu .env.local y reinicia el servidor.`
    );
  }

  return [
    {
      id: "u-admin",
      username: masterUsername!,
      role: "MASTER",
      passwordHash: bcrypt.hashSync(masterPassword!, 10),
    },
    {
      id: "u-gestor01",
      username: gestorUsername!,
      role: "GESTOR",
      passwordHash: bcrypt.hashSync(gestorPassword!, 10),
    },
  ];
}

const USERS = buildUsers();

export class UserRepositoryImpl implements UserRepository {
  async findByUsername(username: string): Promise<User | null> {
    return USERS.find((u) => u.username === username) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    return USERS.find((u) => u.id === id) ?? null;
  }
}
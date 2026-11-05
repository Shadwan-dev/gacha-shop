export type UserRole = "MASTER" | "GESTOR";

export interface User {
  id: string;
  username: string;
  role: UserRole;
  passwordHash: string; // nunca se expone al cliente
}

/** Versión "segura" del usuario, sin hash, para pasar a la UI */
export type PublicUser = Omit<User, "passwordHash">;
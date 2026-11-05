import type { PublicUser } from "@/core/domain/model/User";
import type { UserRepository } from "@/core/domain/repository/UserRepository";
import type { PasswordHasher } from "@/core/domain/repository/PasswordHasher";

export class LoginUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: PasswordHasher
  ) {}

  async execute(username: string, password: string): Promise<PublicUser> {
    const user = await this.users.findByUsername(username);
    if (!user) throw new Error("Credenciales inválidas");

    const ok = await this.hasher.verify(password, user.passwordHash);
    if (!ok) throw new Error("Credenciales inválidas");

    const { passwordHash: _ignored, ...publicUser } = user;
    return publicUser;
  }
}
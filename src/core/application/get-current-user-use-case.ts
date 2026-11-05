import type { PublicUser } from "@/core/domain/model/User";
import type { UserRepository } from "@/core/domain/repository/UserRepository";

export class GetCurrentUserUseCase {
  constructor(private readonly users: UserRepository) {}

  async execute(userId: string): Promise<PublicUser | null> {
    const user = await this.users.findById(userId);
    if (!user) return null;
    const { passwordHash: _ignored, ...publicUser } = user;
    return publicUser;
  }
}
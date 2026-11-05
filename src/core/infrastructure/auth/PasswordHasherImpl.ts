import bcrypt from "bcryptjs";
import type { PasswordHasher } from "@/core/domain/repository/PasswordHasher";

export class PasswordHasherImpl implements PasswordHasher {
  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, 10);
  }

  async verify(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
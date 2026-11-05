import type { Message } from "@/core/domain/model/Message";
import type { MessageRepository } from "@/core/domain/repository/MessageRepository";

export class MessageRepositoryImpl implements MessageRepository {
  async getMessage(): Promise<Message> {
    // Aquí simulo una fuente de datos. En el futuro:
    // - fetch a una API Route de Next
    // - consulta a SQLite
    // - fetch a un backend Express externo
    return {
      id: crypto.randomUUID(),
      text: "¡Hola desde el core, sin saber que existe Next.js!",
      createdAt: new Date(),
    };
  }
}
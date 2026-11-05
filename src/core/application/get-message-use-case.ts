import type { Message } from "@/core/domain/model/Message";
import type { MessageRepository } from "@/core/domain/repository/MessageRepository";

export class GetMessageUseCase {
  constructor(private readonly repository: MessageRepository) {}

  async execute(): Promise<Message> {
    return this.repository.getMessage();
  }
}
import type { Message } from "@/core/domain/model/Message";

export interface MessageRepository {
  getMessage(): Promise<Message>;
}
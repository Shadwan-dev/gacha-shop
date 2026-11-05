export class LogoutUseCase {
  async execute(): Promise<void> {
    // No-op en el core. La cookie se borra en infraestructura (SessionServiceImpl).
  }
}
import APIError from '@notifications/errors/api-error';
import { IMessageLocals, SocketApi } from './@types/socket-sender.type';

export class SocketSender implements SocketApi {
  private static SocketSenderInstance: SocketSender;
  private isActive = false;
  private socketApi: SocketApi | undefined;
  private constructor() {}

  static getInstance(): SocketSender {
    if (!this.SocketSenderInstance) {
      this.SocketSenderInstance = new SocketSender();
    }
    return this.SocketSenderInstance;
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  sendSocketApi(socketApi: SocketApi): void {
    this.socketApi = socketApi;
  }

  async sendNotification(
    template: string,
    receiver: string,
    locals: IMessageLocals,
  ): Promise<void> {
    try {
      this.validateSocketSender();
      this.socketApi!.sendNotification(template, receiver, locals);
    } catch (error: unknown) {
      throw error;
    }
  }
  validateSocketSender(): void {
    if (!this.isActive) {
      throw new APIError('SocketApi is not Acitve!');
    }
    if (!this.socketApi) {
      throw new APIError('SocketApi is not set!');
    }
  }
}

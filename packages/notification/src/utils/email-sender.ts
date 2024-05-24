import APIError from "../errors/api-error";
import { EmailApi, IEmailLocals } from "./@types/email-sender.types";

// ********************************
// Singleton Pattern
// 1. A Class has only single instance
// 2. Provide a global access point to that instance
// link: https://refactoring.guru/design-patterns/singleton
// ********************************

export default class EmailSender implements EmailApi {
  private isActive = false;
  private emailApi: EmailApi | undefined;
  private static emailSenderInstance: EmailSender;

  private constructor() {}

  static getInstance(): EmailSender {
    if (!this.emailSenderInstance) {
      this.emailSenderInstance = new EmailSender();
    }
    return this.emailSenderInstance;
  }

  static resetEmailSenderInstance(): void {
    this.emailSenderInstance = new EmailSender();
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  setEmailApi(emailApi: EmailApi): void {
    this.emailApi = emailApi;
  }

  async sendEmail(
    template: string,
    receiver: string,
    locals: IEmailLocals
  ): Promise<void> {
    this.validateEmailSender();

    this.emailApi!.sendEmail(template, receiver, locals);
  }

  private validateEmailSender(): void {
    if (!this.isActive) {
      throw new APIError("EmailSender is not active");
    }

    if (!this.emailApi) {
      throw new APIError("EmailApi is not set");
    }
  }
}

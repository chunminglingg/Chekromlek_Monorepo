export interface IEmailLocals {
  appLink?: string;
  appIcon?: string;
  username?: string;
  verifyLink?: string;
  resetLink?: string;
}

export interface EmailApi {
  sendEmail(
    template: string,
    receiver: string,
    locals: IEmailLocals
  ): Promise<void>;
}

export interface SmtpServerConfigAuth {
  user: string;
  pass: string;
}

export interface SmtpServerConfig {
  host: string;
  port: number;
  auth: SmtpServerConfigAuth;
}

export interface SmtpServer {
  getConfig(): SmtpServerConfig;
}

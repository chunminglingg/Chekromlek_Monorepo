import { SerializedErrorOutput } from "./@types/serialized-error-output";

export default abstract class BaseCustomError extends Error {
  protected statusCode: number;

  protected constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Allow to chain prototype correctly from Error Class
    Object.setPrototypeOf(this, BaseCustomError.prototype);
  }

  abstract getStatusCode(): number;

  abstract serializeErrorOutput(): SerializedErrorOutput;
}

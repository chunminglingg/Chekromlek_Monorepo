import { SerializedErrorOutput } from "./@Types/serialized-error-output";

export default abstract class BaseCustomError extends Error {
  protected statusCode: number;

  protected constructor(message: string, statusCode: number) {
    // Ensure that message is provided, if not, provide a default message
    super(message || "Unknown error occurred");    
    this.statusCode = statusCode;

    // Allow to chain prototype correctly from Error Class
    Object.setPrototypeOf(this, BaseCustomError.prototype);
  }

  abstract getStatusCode(): number;

  abstract serializeErrorOutput(): SerializedErrorOutput;
}

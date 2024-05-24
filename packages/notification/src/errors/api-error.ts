import { StatusCode } from '../utils/consts/status-code';
import { SerializedErrorOutput } from './@types/serialized-error-output';
import BaseCustomError from './base-custom-error';

export default class APIError extends BaseCustomError {
  constructor(
    message: string,
    statusCode: number = StatusCode.InternalServerError
  ) {
    super(message, statusCode);

    Object.setPrototypeOf(this, APIError.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrorOutput(): SerializedErrorOutput {
    return { errors: [{ message: this.message }] };
  }
}

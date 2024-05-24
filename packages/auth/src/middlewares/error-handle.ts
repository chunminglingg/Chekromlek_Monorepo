import { Request, Response, NextFunction } from "express";
import { ErrorStateCode } from "../utils/error-status-code";

function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  // Default to 500 if no status code is set
  if (err instanceof ErrorStateCode) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  next();
}
export default errorHandler;

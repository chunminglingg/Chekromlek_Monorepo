import { ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import InvalidInputError from "../errors/invalid-input-error";

export const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return next(new InvalidInputError(error));
      }
      next(error);
    }
  };
};

// src/middlewares/validateMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import InvalidInputError from "../errors/invalid-input-error";

const validateInput = (schema: ZodSchema) => {
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

export default validateInput;

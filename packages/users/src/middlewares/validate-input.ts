import InvalidInputError from "@users/errors/invalid-input-error";
import { logger } from "@users/utils/logger";
import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

const validateInput = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      logger.error(`UserService ValidateInput() error: ${error}`);
      if (error instanceof ZodError) {
        return next(new InvalidInputError(error));
      }
      next(error);
    }
  };
};

export default validateInput;

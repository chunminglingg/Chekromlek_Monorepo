import { NextFunction, Request, Response } from "express";
import APIError from "../errors/api-error";
import { StatusCode } from "../utils/consts";
import { logger } from "../utils/logger";
import { verify } from "jsonwebtoken";
import { publicKey } from "../server";

async function verifyUser(req: Request, _res: Response, _next: NextFunction) {
  try {
    console.log(req.path);
    if (!req.session?.jwt) {
      logger.error(
        "Token is not available. Gateway Service verifyUser() method error"
      );
      throw new APIError(
        "Please login to access this resource.",
        StatusCode.Unauthorized
      );
    }

    await verify(req.session!.jwt, publicKey, { algorithms: ["RS256"] });
    _next();
  } catch (error) {
    _next(error);
  }
}

export { verifyUser };

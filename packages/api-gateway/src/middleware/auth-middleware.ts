import { NextFunction, Request, Response } from "express";
import APIError from "../errors/api-error";
import { logger } from "../utils/logger";
import { verify } from "jsonwebtoken";
import { publicKey } from "../server";
import { StatusCode } from "../utils/@const";
import { Session } from "express-session";

interface SessionWithJwt extends Session {
  jwt?: string;
}

async function verifyUser(req: Request, _res: Response, _next: NextFunction) {
  try {
    console.log(req.path);
    if (!(req.session as SessionWithJwt)?.jwt) {
      logger.error(
        "Token is not available. Gateway Service verifyUser() method error"
      );
      throw new APIError(
        "Please login to access this resource.",
        StatusCode.Unauthorized
      );
    }

    const token = (req.session as SessionWithJwt)!.jwt;

    if (token) {
      const verifiedData = await verify(token, publicKey, { algorithms: ["RS256"] });
      // Use verifiedData here
    } else {
      // Handle missing JWT (e.g., throw an error or redirect to login)
      logger.error("JWT token not found in session");
      throw new APIError("Please login to access this resource.", StatusCode.Unauthorized);
    }

    _next();
  } catch (error) {
    _next(error);
  }
}

export { verifyUser };

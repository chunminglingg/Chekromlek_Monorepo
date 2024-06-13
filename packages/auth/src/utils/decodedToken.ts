import jwt from "jsonwebtoken";
import { logger } from "./logger";
import { privateKey } from "../server";
import APIError from "../errors/api-error";

export const decodedToken = async (token: string) => {
  try {
    const decodedPayload = jwt.verify(token, privateKey, {
      algorithms: ["RS256"],
    }) as {
      userId: string;
    };

    // console.log("=== decodePayload === : ", decodedPayload);

    const datapayload = {
      id: decodedPayload.userId,
    }
    
    // console.log("datapayload : ", datapayload)

    return datapayload;
  } catch (error: unknown) {
    logger.error("Unable to decode in decodeToken() method !", error);
    throw new APIError("Can't Decode token!");
  }
};

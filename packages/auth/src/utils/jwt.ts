import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { privateKey } from "../server";
import getConfig from "./config";
import APIError from "../errors/api-error";

dotenv.config();
const salt = 10;
export const generatePassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Unable to generate password");
  }
};

export const validationPassword = async ({
  enterPassword,
  savedPassword,
}: {
  enterPassword: string;
  savedPassword: string;
}) => {
  try {
    return await bcrypt.compare(enterPassword, savedPassword);
  } catch (error) {
    throw new Error("Error validating password"); // Consider more specific error handling
  }
};

export const generateSignature = async (payload: object): Promise<string> => {
  try {
    return await jwt.sign(payload, privateKey, {
      expiresIn: getConfig().jwtExpiresIn!,
      algorithm: "RS256",
    });
  } catch (error) {
    console.log(error);
    throw new APIError("Unable to generate signature from jwt");
  }
};

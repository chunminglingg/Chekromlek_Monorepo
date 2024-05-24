import dotenv from "dotenv";
import { StatusCode } from "./consts";
import CustomError from "../errors/custom-erorrs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    return await jwt.sign(payload, process.env.APP_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    throw new CustomError(
      "Unable to generate signature from jwt",
      StatusCode.BadRequest
    );
  }
};

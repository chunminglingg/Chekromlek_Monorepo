import { privateKey } from "@post/server";
import jwt from "jsonwebtoken";

export const verificationToken = (req: any, _res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    throw new Error("Token not provided");
  }
  try {
    const decodedToken = jwt.verify(token, privateKey, {
      algorithms: ["RS256"],
    }) as {
      userId: string;
      username: string;
    };
    req.userId = decodedToken.userId;
    req.username = decodedToken.username;
    next();
  } catch (error: any) {
    throw new Error(error.message); // Throw error for invalid token
  }
};

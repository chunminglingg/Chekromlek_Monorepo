import jwt, { JwtPayload } from 'jsonwebtoken';

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    // Decode the token without verifying the signature
    const decoded = jwt.decode(token) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

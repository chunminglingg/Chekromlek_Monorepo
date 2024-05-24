import { privateKey } from '@users/server';
import jwt from 'jsonwebtoken';

export const verificationToken = (req: any, _res: any, next: any) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
      throw new Error('Token not provided');
    }
    console.log('token', token);
    const decodedToken = jwt.verify(token, privateKey, {
      algorithms: ['RS256'],
    }) as {
      userId: string;
    };

    console.log('Decoded: ', decodedToken);

    req.userId = decodedToken.userId; // Attach userId to the request object
    next(); // If token is valid, continue to the next middleware or route handler
  } catch (error) {
    throw error;
  }
};

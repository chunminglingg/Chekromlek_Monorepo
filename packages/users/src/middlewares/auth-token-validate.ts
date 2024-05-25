import { privateKey } from '@users/server';
import { StatusCode } from '@users/utils/consts';
import jwt from 'jsonwebtoken';

export const verificationToken = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Token', token);
    if (!token) {
      return res
        .status(StatusCode.Unauthorized)
        .json({ message: 'Authorization header not provided' });
    }
    const decodedToken = jwt.verify(token, privateKey, {
      algorithms: ['RS256'],
    }) as {
      userid: string;
    };
    console.log('Decoded:', decodedToken);

    req.userid = decodedToken.userid; // Attach userId to the request object
    next(); // If token is valid, continue to the next middleware or route handler
  } catch (error: any) {
    throw new Error(error.message); // Throw error for invalid token
  }
};

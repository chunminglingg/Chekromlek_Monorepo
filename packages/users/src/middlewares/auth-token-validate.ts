import { public_key } from '@users/server';
import jwt from 'jsonwebtoken';

export const verificationToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }
  console.log('Token:', token);
  try {
    const decodedToken = jwt.verify(token, public_key, {
      algorithms: ['RS256'],
    }) as {
      userId: string;
    };
    req.userId = decodedToken.userId;
    next();
  } catch (error: any) {
    return res.status(401).json({ message: 'Invalid token: ' + error.message });
  }
};

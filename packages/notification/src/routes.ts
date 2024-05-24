import express, { Router, Request, Response } from 'express';
import { StatusCode } from './utils/consts/status-code';

const router: Router = express.Router();

export function healthRoutes(): Router {
  router.get('/notification-health', (_req: Request, res: Response) => {
    res
      .status(StatusCode.OK)
      .json({ message: 'Notification service is healthy and OK' });
  });

  return router;
}

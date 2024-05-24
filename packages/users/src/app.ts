import express, { Request, Response, NextFunction } from 'express';

import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { urlencoded } from 'body-parser';
import { verify } from 'jsonwebtoken';
import loggerMiddleware from '@users/middlewares/logger-handler';
import { StatusCode } from '@users/utils/consts';
import { logger } from '@users/utils/logger';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../dist/swagger/swagger.json';
import { privateKey } from './server';
import { errorHandler } from '@users/middlewares/error-handler';
import getConfig from '@users/utils/config';
import { RegisterRoutes } from './routes/routes';

export const app = express();

// Get the Configs
const config = getConfig(process.env.NODE_ENV);

// =======================
// Security Middlewares
// =======================
app.set('trust proxy', 1);
app.use(hpp());
app.use(helmet());
app.use(
  cors({
    origin: [`${config.apiGatewayUrl}`, `${config.authServiceUrl}`],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

// =======================
// Standard Middleware
// =======================
app.use(compression());
app.use(express.json({ limit: '200mb' }));
app.use(urlencoded({ extended: true, limit: '200mb' }));
app.use(express.static('public'));
app.use(loggerMiddleware);
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    console.log('token: ', token);
    const payload = verify(token, privateKey);
    console.log('payload', payload);
    // @ts-ignore
    req.currentUser = payload;
  }
  next();
});

// ========================
// Global API V1
// ========================
RegisterRoutes(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ========================
// Global Error Handler
// ========================
app.use('*', (req: Request, res: Response, _next: NextFunction) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  logger.error(`${fullUrl} endpoint does not exist`);
  res
    .status(StatusCode.NotFound)
    .json({ message: 'The endpoint called does not exist.' });
});
app.use(errorHandler);

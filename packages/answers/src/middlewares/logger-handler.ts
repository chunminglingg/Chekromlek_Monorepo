import  beautifulStringify  from '@answers/utils/beautiful_stringify';
import { logger } from '@answers/utils/logger';
import { NextFunction, Request, Response } from 'express';
import onHeaders from 'on-headers';

function loggerMiddleware(req: Request, res: Response, _next: NextFunction) {
  const started = new Date().getTime();
  logger.debug(
    `request received: ${beautifulStringify({
      url: req.url,
      method: req.method,
      body: req.body,
    })}`,
  );

  onHeaders(res, () => {
    logger.info(
      `response sent ${beautifulStringify({
        url: req.url,
        method: req.method,
        statusCode: res.statusCode,
        duration: new Date().getTime() - started,
      })}`,
    );
  });

  _next();
}

export default loggerMiddleware;

import { NextFunction, Response } from 'express';
import { decode } from 'jsonwebtoken';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';

export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: ExpressRequestInterface, res: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      const message = `${method} ${statusCode} ${userAgent} ${ip}${originalUrl} size: ${contentLength}b`;
      if (statusCode > 205) this.logger.error(message);
      else this.logger.log(message);

      const auth = req.headers?.authorization;
      if (auth) {
        this.logger.log(req.headers.authorization, decode(auth.split(' ')[1]));
      }
    });
    next();
  }
}

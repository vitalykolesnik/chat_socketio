import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    next();
  }
}

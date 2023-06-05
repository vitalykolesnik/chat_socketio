import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JWT_SECRET } from '@app/config';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { UserEntity } from '@app/modules/user/entities/user.entity';
import { UserService } from '@app/modules/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      return next();
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      verify(token, JWT_SECRET, async (err, decoded: UserEntity) => {
        if (err) {
          req.user = null;
          return next();
        }
        const user = await this.userService.findUserById(decoded.id);
        req.user = user;
        next();
      });
    } catch (err) {
      req.user = null;
      next();
    }
  }
}

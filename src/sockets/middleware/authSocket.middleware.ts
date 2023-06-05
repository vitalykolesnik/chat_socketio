import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserEntity } from '@app/modules/user/entities/user.entity';
import { CustomSocketInterface } from '@app/sockets/types/customSocket.interface';

export const authSocketMiddleware = (
  socket: CustomSocketInterface,
  next: NextFunction,
) => {
  if (socket.handshake?.auth?.token) {
    verify(
      socket.handshake.auth.token as string,
      JWT_SECRET,
      (err, decoded) => {
        if (err) {
          next(new Error('Not valid token'));
        } else {
          socket.user = decoded as UserEntity;
          next();
        }
      },
    );
  } else {
    next(new Error('Auth error'));
  }
};

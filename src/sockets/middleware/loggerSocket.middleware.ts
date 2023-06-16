import { Logger } from '@nestjs/common';
import { NextFunction } from 'express';
import { CustomSocketInterface } from '@app/sockets/types/customSocket.interface';

export const loggerWrapMiddleware = (logger: Logger) => {
  const socketLogger = logger;
  return (socket: CustomSocketInterface, next: NextFunction) => {
    {
      socket.on('connect', () => {
        socketLogger.debug(`Connect ${socket.user.userName} by [${socket.id}]`);
      });

      socket.on('disconnect', () => {
        socketLogger.warn(
          `Disconnect ${socket.user.userName} by [${socket.id}]`,
        );
      });

      socket.onAny((event) => {
        socketLogger.debug(`From [${socket.id}] event - ${event}`);
      });
      next();
    }
  };
};

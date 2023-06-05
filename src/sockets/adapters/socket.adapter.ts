import { IoAdapter } from '@nestjs/platform-socket.io';
import { authSocketMiddleware } from '@app/sockets/middleware/authSocket.middleware';
import { loggerWrapMiddleware } from '@app/sockets/middleware/loggerSocket.middleware';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, { ...options, cors: true });
    const logger = new Logger('SOCKET');
    server.use(authSocketMiddleware);
    server.use(loggerWrapMiddleware(logger));
    return server;
  }
}

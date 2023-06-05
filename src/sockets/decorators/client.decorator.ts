import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomSocketInterface } from '@app/sockets/types/customSocket.interface';

export const Client = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const context = ctx.switchToWs();
    const client = context.getClient<CustomSocketInterface>();
    if (!client.user) return null;
    if (!data) {
      return client.user;
    }
    return client.user[data];
  },
);

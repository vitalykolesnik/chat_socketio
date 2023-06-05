import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const context = ctx.switchToHttp();
    const req = context.getRequest<ExpressRequestInterface>();
    if (!req.user) return null;
    if (!data) {
      return req.user;
    }
    return req.user[data];
  },
);

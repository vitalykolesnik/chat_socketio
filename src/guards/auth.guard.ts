import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<ExpressRequestInterface>();
    if (!req.user)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    return true;
  }
}

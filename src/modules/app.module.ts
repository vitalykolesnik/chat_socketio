import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import config from '@app/ormconfig';
import { UserModule } from '@app/modules/user/user.module';
import { LoggerMiddleware } from '@app/middleware/logger.middleware';
import { AuthMiddleware } from '@app/middleware/authHTTP.middleware';
import { ChatModule } from '@app/sockets/modules/chat/chat.module';
import { CorsMiddleware } from '@app/middleware/cors.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule, ChatModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware);
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/modules/app.module';
import { SocketAdapter } from '@app/sockets/adapters/socket.adapter';

if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: 'http://localhost:3000' });
    app.useWebSocketAdapter(new SocketAdapter(app));
    await app.listen(4000);
  } catch (e) {
    console.error(e);
  }
}
bootstrap();

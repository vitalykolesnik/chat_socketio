import { Module } from '@nestjs/common';
import { ChatGateway } from '@app/sockets/modules/chat/chat.gateway';
import { UserModule } from '@app/modules/user/user.module';
import { MessageModule } from '@app/sockets/modules/message/message.module';

@Module({
  imports: [UserModule, MessageModule],
  providers: [ChatGateway],
})
export class ChatModule {}

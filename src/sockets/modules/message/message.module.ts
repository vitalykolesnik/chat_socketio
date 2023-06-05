import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserModule } from '@app/modules/user/user.module';
import { MessageGateway } from '@app/sockets/modules/message/message.gateway';
import { MessageService } from '@app/sockets/modules/message/message.service';
import { MessageEntity } from '@app/sockets/modules/message/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity]), UserModule],
  providers: [MessageGateway, MessageService],
  exports: [MessageModule],
})
export class MessageModule {}

import { Server } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Client } from '@app/sockets/decorators/client.decorator';
import { CustomSocketInterface } from '@app/sockets/types/customSocket.interface';
import { MessageService } from '@app/sockets/modules/message/message.service';
import { CreateMessageDto } from '@app/sockets/modules/message/dto/create-message.dto';
import { Body } from '@nestjs/common';

@WebSocketGateway()
export class MessageGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @Client('userName') user: string,
  ) {
    const message = await this.messageService.createMessage(
      createMessageDto,
      user,
    );
    this.server.emit('requireUpdateMessageList');
    return message;
  }

  @SubscribeMessage('getMessageList')
  async findAll(@ConnectedSocket() socket: CustomSocketInterface) {
    const messages = await this.messageService.getAllMessages();
    socket.emit('updateMessageList', { messages });
    return messages;
  }

  @SubscribeMessage('deleteMessage')
  async delete(@Body('id') messageId: string) {
    await this.messageService.deleteMessage(messageId);
    this.server.emit('requireUpdateMessageList');
  }
}

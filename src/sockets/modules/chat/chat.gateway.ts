import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UserEntity } from '@app/modules/user/entities/user.entity';
import { Client } from '@app/sockets/decorators/client.decorator';
import { CustomSocketInterface } from '@app/sockets/types/customSocket.interface';
import { UserService } from '@app/modules/user/user.service';
import { UpdateUserDTO } from '@app/modules/user/dto/update-user.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly userService: UserService) {}

  async handleConnection(@ConnectedSocket() client: CustomSocketInterface) {
    await this.changeStatus(client, true);
  }

  async handleDisconnect(@ConnectedSocket() client: CustomSocketInterface) {
    await this.changeStatus(client, false);
  }

  @SubscribeMessage('changeStatus')
  async changeStatus(client: CustomSocketInterface, isOnline: boolean) {
    const updates = { socketId: '', isOnline } as UpdateUserDTO;
    await this.userService.updateUser(client.user.id, updates);
    this.server.emit('requireUpdateUsersList');
  }

  @SubscribeMessage('getMe')
  getMe(
    @ConnectedSocket() socket: CustomSocketInterface,
    @Client() client: UserEntity,
  ) {
    socket.emit('info', { user: client });
    return client;
  }

  @SubscribeMessage('getUsersList')
  async getUsers(@ConnectedSocket() socket: CustomSocketInterface) {
    const users = await this.userService.getUsers();
    this.server.emit('updateUsersList', { ...users });
    return users;
  }

  @SubscribeMessage('isTyping')
  async typing(@ConnectedSocket() client: CustomSocketInterface) {
    this.server.emit('typing', client.user.userName);
  }

  /*
  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messagesService.remove(id);
  }*/
}

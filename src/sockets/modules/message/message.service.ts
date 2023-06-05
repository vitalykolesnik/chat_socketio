import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '@app/sockets/modules/message/dto/create-message.dto';
import { MessageEntity } from '@app/sockets/modules/message/entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { UserEntity } from '@app/modules/user/entities/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto, user: string) {
    const message = this.messageRepository.create({
      ...createMessageDto,
      user,
      createdAt: new Date(),
    });
    await this.messageRepository.save(message);
    return message;
  }

  async getAllMessages() {
    return await this.messageRepository.find({ order: { createdAt: 'ASC' } });
  }

  async deleteMessage(messageId: string) {
    return await this.messageRepository.delete(messageId);
  }
  /*
  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

 
  */
}

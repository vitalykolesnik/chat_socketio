import { UserEntity } from '@app/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'messages' })
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user: string;

  @Column({ nullable: false })
  text: string;

  @Column({ default: 'main' })
  to: string;

  @Column()
  createdAt: Date;
}

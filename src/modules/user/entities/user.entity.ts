import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  userName: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: false })
  isOnline: boolean;

  @Column({ select: false, default: '' })
  socketId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @BeforeInsert()
  createUserName() {
    this.userName = this.email;
  }
}

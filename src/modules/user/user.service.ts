import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { compareCryptPassword } from '@app/utils';
import { UserEntity } from '@app/modules/user/entities/user.entity';
import {
  CreateUserDTO,
  LoginUserDTO,
  UpdateUserDTO,
} from '@app/modules/user/dto';
import {
  LoginResponseInterface,
  UserResponseInterface,
} from '@app/modules/user/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOneBy({
      email: createUserDTO.email,
    });
    if (userByEmail)
      throw new HttpException(
        'User are taken!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    const user = this.userRepository.create(createUserDTO);
    await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async loginUser(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDTO.email,
      },
      select: [
        'id',
        'email',
        'password',
        'userName',
        'bio',
        'isOnline',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!user)
      throw new HttpException(
        'Username or password are wrong',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    const isValidPassword = await compareCryptPassword(
      loginUserDTO.password,
      user.password,
    );
    if (!isValidPassword)
      throw new HttpException(
        'Username or password are wrong',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    delete user.password;
    return user;
  }

  async findUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async getUsers(
    userName?: string,
    limit?: number,
    page?: number,
  ): Promise<{ users: UserEntity[]; total: number }> {
    const customQuery = this.userRepository.createQueryBuilder('user');
    if (userName) customQuery.where(`user.userName LIKE '%${userName}%'`);
    if (limit) customQuery.take(limit);
    if (page) customQuery.skip(page * limit);
    customQuery.orderBy('user.userName');
    const [users, total] = await customQuery.getManyAndCount();
    return { users, total };
  }

  async updateUser(
    id: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<UserEntity> {
    try {
      const user = await this.findUserById(id);
      Object.assign(user, updateUserDTO);
      user.updatedAt = new Date();
      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string): Promise<UserEntity> {
    const user = await this.findUserById(id);
    return await this.userRepository.remove(user);
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
      },
    };
  }

  buildLoginResponse(user: UserEntity): LoginResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJWT(user),
      },
    };
  }

  generateJWT(user: UserEntity): string {
    return sign({ ...user }, JWT_SECRET); //, { expiresIn: '1h' });
  }
}

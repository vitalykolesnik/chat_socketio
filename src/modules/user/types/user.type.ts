import { UserEntity } from '@app/modules/user/entities/user.entity';

export type UserType = Omit<UserEntity, 'hashPassword' | 'createUserName'>;

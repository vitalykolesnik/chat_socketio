import { UserType } from '@app/modules/user/types';

export interface UsersResponseInterface {
  users: Array<UserType>;
  total: number;
}

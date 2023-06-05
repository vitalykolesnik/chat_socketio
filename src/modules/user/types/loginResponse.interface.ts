import { UserType } from '@app/modules/user/types';

export interface LoginResponseInterface {
  user: UserType & { token: string };
}

import { compare } from 'bcrypt';

export const compareCryptPassword = async (
  password: string,
  userHash: string,
) => {
  return await compare(password, userHash);
};

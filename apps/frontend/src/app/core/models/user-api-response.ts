import { IUser } from './user';

export interface IUserApiResponse {
  user: IUser;
  token: string;
}

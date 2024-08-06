import { Role } from '@interfaces/';

export interface IAdmin {
  id: string;
  email: string;
  name: string;
  password: string;
  role: Role
}
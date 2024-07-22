import { role } from './role.enum';

export interface IAdmin {
  id: string;
  email: string;
  name: string;
  password: string;
  role: role
}
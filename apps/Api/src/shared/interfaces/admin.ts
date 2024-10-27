import { Role } from '@enums';

export interface IAdmin {
  id: number;
  email: string;
  name: string;
  password: string;
  role: Role
}

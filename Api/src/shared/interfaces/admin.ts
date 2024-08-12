import { Role } from '@enums/role.enum';

export interface IAdmin {
  id: number;
  email: string;
  name: string;
  password: string;
  role: Role
}
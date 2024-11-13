import { Role } from '@enums';

export interface IAdmin {
  id: string;
  email: string;
  name: string;
  password: string;
  role: Role;
}

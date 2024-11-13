import { Role } from '../enums/role.enum';

export interface IDecodeToken {
  id: string;
  email: string;
  role: Role;
}

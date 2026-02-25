import { Role } from '@common/models/enums/role.enum';

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  password: string;
  role: Role;
}

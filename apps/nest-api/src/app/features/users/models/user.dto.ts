import { Role } from '@api/common/models/enums/role.enum';

export interface IUserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  role: Role;
}

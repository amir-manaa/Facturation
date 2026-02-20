import { UserRole } from '@common/models/enums/user-role.enum';

export interface IUserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  role: UserRole;
}

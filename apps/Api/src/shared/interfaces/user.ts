export interface IUser {
  id: string;
  email: string;
  name: string;
  phone: number | null;
  address: string;
  password: string;
  role: number;
}

import { ICustomer } from './customer';
export interface ICustomerApiResponse {
  customers: ICustomer[];
  total: number;
}

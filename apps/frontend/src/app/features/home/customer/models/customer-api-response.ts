import { ICustomer } from './customer';
export interface ICustomerApiResponse {
  totalCount: number;
  customers: ICustomer[];
}

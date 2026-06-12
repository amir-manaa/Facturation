import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, Observable } from 'rxjs';
import { ICustomerApiResponse, ICustomer } from '../models';
import { GlobalConstants } from '@utils';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly API_URL = '/api/customers';
  private readonly http = inject(HttpClient);

  /*
  private customerIdSubject = new BehaviorSubject<number|null>(null);
  customerId$ = this.customerIdSubject.asObservable();

   */

  getAll(apiParams: {}): Observable<ICustomerApiResponse> {
    const params = { params: apiParams };
    return this.http.get<ICustomerApiResponse>(`${this.API_URL}`, params);
  }

  getOne(id: string): Observable<ICustomer> {
    return this.http.get<ICustomer>(`${this.API_URL}/${id}`);
  }

  add(newCustomer: Partial<ICustomer>): Observable<any> {
    return this.http.post<any>(`${this.API_URL}`, newCustomer);
  }

  modify(id: string, customer: Partial<ICustomer>): Observable<ICustomer> {
    console.log(id, customer);
    return this.http.patch<ICustomer>(`${this.API_URL}/${id}`, customer);
  }

  delete(id: string): Observable<ICustomerApiResponse> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(
      concatMap(res => {
        return this.getAll(GlobalConstants.pageSize)
      })
    );
  }
}

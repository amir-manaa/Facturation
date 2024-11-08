import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, Observable, shareReplay } from 'rxjs';
import { ICustomer } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly API_URL = '/api/v1/customers';
  private readonly http = inject(HttpClient);

  /*
  private customerIdSubject = new BehaviorSubject<number|null>(null);
  customerId$ = this.customerIdSubject.asObservable();

   */

  getAll() {
    return this.http.get<ICustomer[]>(`${this.API_URL}`).pipe(shareReplay(1));
  }

  add(newCustomer: Partial<ICustomer>): Observable<any> {
    return this.http.post<any>(`${this.API_URL}`, newCustomer);
  }

  delete(id: number): Observable<ICustomer[]> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(
      concatMap(res => {
        return this.getAll()
      })
    );
  }
}

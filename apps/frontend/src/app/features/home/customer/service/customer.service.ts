import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<any> {
    return this.http.get('/api/v1/customers');
  }

  add(newCustomer: any): Observable<any> {
    return this.http.post<any>('/api/v1/customer', newCustomer);
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomerApiResponse } from '../../customer/models';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private readonly API_URL = '/api/v1/invoices';
  private readonly http = inject(HttpClient);

  customers$ = this.http.get<ICustomerApiResponse[]>(`/api/v1/customers`);
}

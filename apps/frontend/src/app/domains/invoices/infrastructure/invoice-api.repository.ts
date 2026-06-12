import { Injectable } from '@angular/core';
import { InvoiceRepository } from '../domain/repositories/invoice.repository';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { InvoiceDto } from './dto/invoice.dto';
import { InvoiceMapper } from './invoice.mapper';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { InvoiceEntity } from '../domain/entities/invoice.entity';

@Injectable()
export class InvoiceApiRepository extends InvoiceRepository {
  private readonly http = inject(HttpClient);
  private readonly invoiceMapper = inject(InvoiceMapper);

  findAll() {
    return this.http
      .get<InvoiceDto[]>('/api/invoices')
      .pipe(
        map((response: InvoiceDto[]) =>
          response.map((dto: InvoiceDto) => this.invoiceMapper.toDomain(dto))
        )
      );
  }

  findById(id: string): Observable<InvoiceEntity> {
    return this.http
      .get<InvoiceDto>(`/api/customers/${id}`)
      .pipe(map((dto) => this.invoiceMapper.toDomain(dto)));
  }

  create(data: InvoiceEntity): Observable<InvoiceEntity> {
    return this.http
      .post<InvoiceDto>('/api/customers', this.invoiceMapper.toDto(data))
      .pipe(map((dto) => this.invoiceMapper.toDomain(dto)));
  }
}


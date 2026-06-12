import { Observable } from 'rxjs';
import { InvoiceEntity } from '../entities/invoice.entity';

export abstract class InvoiceRepository {
  abstract findAll(): Observable<InvoiceEntity[]>;
  abstract findById(id: string): Observable<InvoiceEntity>;
  abstract create(invoice: InvoiceEntity): Observable<InvoiceEntity>;
  // abstract update(id: string, invoice: Invoice): Observable<Invoice>;
  // abstract delete(id: string): Observable<Invoice>;
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InvoiceService } from '../service/invoice.service';
import { ICustomerApiResponse } from '../../customer/models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-add-invoice',
    imports: [CommonModule, RouterLink],
    templateUrl: './add-invoice.component.html',
    styleUrl: './add-invoice.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddInvoiceComponent {
  invoiceService = inject(InvoiceService);

  customers: Observable<ICustomerApiResponse[]> = this.invoiceService.customers$;
}

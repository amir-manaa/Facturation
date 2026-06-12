import { Routes } from '@angular/router';
import { InvoiceApiRepository } from '../infrastructure/invoice-api.repository';
import { InvoiceMapper } from '../infrastructure/invoice.mapper';

export const INVOCE_ROUTES: Routes = [
    {
      path: '',
      providers: [
        InvoiceMapper,
        { provide: 'InvoiceRepository', useClass: InvoiceApiRepository }
      ],
      loadComponent: (() => import ('./invoice-list').then(m => m.InvoiceList))
    },
  ]

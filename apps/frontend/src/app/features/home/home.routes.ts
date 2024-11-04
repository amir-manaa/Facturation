import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { authGuard } from '@guards';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customer/customers/customers.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';

export const homeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard'
      },
      {
        path: 'customers',
        component: CustomersComponent,
        title: 'Customers'
      },
      {
        path: 'customers/add',
        component: AddCustomerComponent,
        title: 'Add Customer'
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
        title: 'Invoices'
      }
    ]
  },
];

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/ui/header/header.component';
import { SidebarComponent } from '../../shared/ui/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent {
  dashboardRoutes = [
    {
      label: 'Dashboard',
      path: 'dashboard',
      icon: 'dashboard'
    },
    {
      label: 'Clients',
      path: 'customers',
      icon: 'person_search'
    },
    {
      label: 'Ajouter un client',
      path: '/customers/add',
      icon: 'person_add'
    },
    {
      label: 'Factures',
      path: 'invoices',
      icon: 'receipt_long'
    },
  ]
}

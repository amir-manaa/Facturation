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
      icon: 'person_search',
      children: [
        {
          label: 'Listes des clients',
          path: '/customers',
          icon: 'person_add'
        },
        {
          label: 'Ajouter un client',
          path: '/customers/add',
          icon: 'person_add'
        }
      ]
    },
    {
      label: 'Factures',
      icon: 'receipt_long',
      children: [
        {
          label: 'Listes des factures',
          path: '/invoices',
          icon: 'person_add'
        },
        {
          label: 'Ajouter une facture',
          path: '/invoices/add',
          icon: 'person_add'
        }
      ]
    },
  ]
}

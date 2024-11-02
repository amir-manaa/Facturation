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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  dashboardRoutes = [
    {
      label: 'dashboard',
      path: 'dashboard',
      icon: 'dashboard'
    },
    {
      label: 'customers',
      path: 'customers',
      icon: 'person_search'
    },
    {
      label: 'invoices',
      path: 'invoices',
      icon: 'receipt_long'
    },
  ]
}

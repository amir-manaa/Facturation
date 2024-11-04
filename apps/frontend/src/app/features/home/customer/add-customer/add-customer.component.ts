import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCustomerComponent {}

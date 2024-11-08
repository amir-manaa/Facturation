import { Component, inject, ChangeDetectionStrategy, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../service/customer.service';
import { ICustomer } from '../models';
import { ConfirmDialogComponent, PaginatorComponent } from '@sharedComponents';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, PaginatorComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersComponent implements OnInit {
  private readonly customerService = inject(CustomerService);
  private readonly dialog = inject(MatDialog);

  customers: WritableSignal<ICustomer[]> = signal([]);

  ngOnInit() {
    this.getAll();
  }

  onPageChanged(event: PageEvent) {
    console.log(event);
  }

  openConfirmDeleteDialog(id: number, customerName: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Supprimer le client',
        content: `Souhaitez-vous supprimer le client <b>${customerName}</b> ?`,
        confirmButton: 'Supprimer',
      },
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.customerService.delete(id).subscribe(customer => this.customers.set(customer));
      }
    });
  }

  private getAll() {
    this.customerService.getAll().subscribe(customers => {
      console.log(customers);
      this.customers.set(customers)
    });
  }
}

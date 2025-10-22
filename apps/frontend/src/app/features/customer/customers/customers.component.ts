import { Component, inject, ChangeDetectionStrategy, OnInit, signal, WritableSignal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { ICustomer } from '../models';
import { ConfirmDialogComponent, PaginatorComponent } from '@sharedComponents';
import { PageEvent } from '@angular/material/paginator';
import { GlobalConstants } from '@utils';
import { switchMap } from 'rxjs';
import { helper } from '@utils';


@Component({
    selector: 'app-customer',
    imports: [CommonModule, MatTooltipModule, PaginatorComponent, RouterLink],
    templateUrl: './customers.component.html',
    styleUrl: './customers.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent implements OnInit {
  private readonly customerService = inject(CustomerService);
  private readonly dialog = inject(MatDialog);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  @ViewChild(PaginatorComponent) pagenator!: PaginatorComponent;
  customers: WritableSignal<ICustomer[]> = signal([]);
  totalCount: WritableSignal<number> = signal(0);

  ngOnInit() {
    this.getAll();
  }

  onPageChanged(event: PageEvent) {
    const urlWithoutParams = helper.urlWithoutParams(this.router);
    const { pageIndex } = event;
    this.router.navigate([`${urlWithoutParams}`], {
      queryParams: { pageIndex },
      queryParamsHandling: 'replace',
    });
  }

  openConfirmDeleteDialog(id: string, customerName: string): void {
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
        this.customerService.delete(id).subscribe((response) => {
          this.totalCount.set(response.totalCount);
          this.customers.set(response.customers);
        });
      }
    });
  }

  public getAll() {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params) => {
          const limit = params['limit'] || GlobalConstants.pageSize;
          const apiParams = { limit, ...params };
          return this.customerService.getAll(apiParams);
        })
      )
      .subscribe((response) => {
        this.totalCount.set(response.totalCount);
        this.customers.set(response.customers);
      });
  }
}

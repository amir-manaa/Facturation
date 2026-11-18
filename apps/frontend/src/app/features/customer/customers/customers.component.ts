import { Component, inject, ChangeDetectionStrategy, signal, WritableSignal, ViewChild, viewChild, ElementRef, OnInit, resource, Signal } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { ICustomer } from '../models';
import { ConfirmDialogComponent, PaginatorComponent } from '@sharedComponents';
import { PageEvent } from '@angular/material/paginator';
import { helper } from '@utils';
import { CustomersFacade } from '../facade/customers.facade';
import { InvoicesComponent } from '../../invoice/invoices/invoices.component'
import { fromEvent, mergeMap, of, switchMap } from 'rxjs';
import { effect } from '@angular/core';


@Component({
  selector: 'app-customer',
  imports: [
    CommonModule,
    MatTooltipModule,
    PaginatorComponent,
    RouterLink,
    InvoicesComponent,
    JsonPipe,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CustomersFacade],
})
export class CustomersComponent implements OnInit {
  private readonly customerService = inject(CustomerService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  protected readonly customersFacade = inject(CustomersFacade);

  @ViewChild(PaginatorComponent) pagenator!: PaginatorComponent;
  private customers: WritableSignal<ICustomer[]> = signal([]);
  private totalCount = signal(0);

  // btnStart = viewChild<ElementRef<HTMLButtonElement>>('btnStart');
  // click$ = fromEvent(this.btnStart()!.nativeElement, 'click');


  // limitSignal = signal<string>('5');

  // customerResource = resource({
  //   params: () => {return this.limitSignal()},
  //   loader: async (limitSignal) => {
  //     const response = await fetch(`http://localhost:4200/api/customers?pageIndex=0&limit=${limitSignal}`);
  //     if (!response.ok) {
  //       console.log('error here')
  //       throw new Error('ERROOOOOOOOOOOOOOR !!!');
  //     }
      
  //     return await response.json();
  //   }
  // })

  constructor() {

    //  effect(() => {

    //   console.log('customerResource error : ', this.customerResource.error());
    //   console.log('customerResource status : ', this.customerResource.status());
    //   console.log('customerResource isLoading : ', this.customerResource.isLoading());
    //   console.log('customerResource value : ', this.customerResource.value());
    // });

    // setTimeout(() => {
    //   this.limitSignal.set('7')
    // }, 2000); 
  }

  ngOnInit(): void {
    // this.click$.subscribe(console.log);
  }

  onPageChanged(event: PageEvent) {
    console.log('onPageChanged event:', event);
    const urlWithoutParams = helper.urlWithoutParams(this.router);
    const { pageIndex, pageSize, previousPageIndex } = event;
    this.router.navigate([`${urlWithoutParams}`], {
      queryParams: { page: pageIndex, limit: pageSize },
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
          this.totalCount.set(response.customers.length);
          this.customers.set(response.customers);
        });
      }
    });
  }
}

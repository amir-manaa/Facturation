import { computed, inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { customersStore } from '../../../shared/stores/customers/customers.store';
import { GetCustomersPayload } from '../models';

@Injectable()
export class CustomersFacade {
  private readonly customersStore = inject(customersStore);

  private readonly route = inject(ActivatedRoute);

  public customersList = computed(() => this.customersStore.customers());

  public customersCount = computed(() => this.customersStore.totalCount());

  constructor() {
    this.getCustomers();
  }

  public getCustomers(): void {
    this.route.queryParams.subscribe((params: GetCustomersPayload) => {
      this.customersStore.getCustomers(params);
    });
  }
}

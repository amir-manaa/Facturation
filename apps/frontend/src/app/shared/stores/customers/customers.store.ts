import {
  patchState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  GetCustomersPayload,
  ICustomerApiResponse,
} from '../../../features/customer/models';
import { inject } from '@angular/core';
import { CustomerService } from '../../../features/customer/service/customer.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';

export interface ICustomersState extends ICustomerApiResponse{
  isLoading: boolean;
}

export const initialState: ICustomersState = {
  isLoading: false,
  totalCount: 0,
  customers: [],
};

export const CustomersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withStorageSync({
    key: 'customers',
    autoSync: true,
    storage: () => sessionStorage,  // Utiliser sessionStorage au lieu de localStorage
    stringify: (state) => btoa(JSON.stringify(state)),
    parse: (state) => JSON.parse(atob(state)),
  }),
  withMethods((store, customersService = inject(CustomerService)) => ({
    getCustomers: rxMethod<GetCustomersPayload>(
      pipe(
        distinctUntilChanged(),
        debounceTime(300),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((apiParams) => {
          return customersService.getAll(apiParams).pipe(
            tapResponse({
              next: (response: ICustomerApiResponse) => patchState(
                store, {
                  isLoading: false,
                  totalCount: response.totalCount,
                  customers: response.customers
                }),
              error: (error: HttpErrorResponse) => patchState(store, { isLoading: false }),
            })
          )
        })
      )
    )
  })),
);

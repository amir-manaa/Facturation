import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withHooks
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
import { GlobalConstants } from '@utils';
import {
  withStorageSync,
  withLocalStorage,
  withSessionStorage,
} from '@angular-architects/ngrx-toolkit';


export interface ICustomersState extends ICustomerApiResponse {
  page: number;
  limit: number;
  isLoading: boolean;
  error: string | null;
}

export const initialState: ICustomersState = {
  page: 0,
  limit: GlobalConstants.pageSize,
  isLoading: false,
  total: 0,
  customers: [],
  error: null
};

export const CustomersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  // withStorageSync(
  //   {
  //     key: 'customers',
  //     autoSync: true,
  //     stringify: (state) => btoa(JSON.stringify(state)),
  //     parse: (state) => JSON.parse(atob(state)),
  //   },
  //   withLocalStorage()
  // ),
  withMethods((store, customersService = inject(CustomerService)) => ({
    getCustomers: rxMethod<GetCustomersPayload>(
      pipe(
        distinctUntilChanged(),
        debounceTime(300),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((payload) => {
          return customersService.getAll(payload).pipe(
            tap((res) =>
              console.log('CustomersStore.getCustomers response:', res)
            ),
            tapResponse({
              next: (response: ICustomerApiResponse) =>
                patchState(store, {
                  isLoading: false,
                  total: response.total,
                  customers: response.customers,
                }),
              error: (error: HttpErrorResponse) =>
                patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
    setPage(page: number, limit: number) {
      patchState(store, { page, limit })
    }
  })),
  withHooks({
    onInit(store) {
      store.getCustomers(new GetCustomersPayload(0, 5));
    }
  })
);

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerService } from '../customer.service';
import { CustomerActions } from './customer.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Customer } from '../customer.model';

@Injectable()
export class CustomerEffect {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      exhaustMap(() =>
        this.customerService.getCustomers().pipe(
          map((customers: Customer[]) =>
            CustomerActions.loadCustomersSuccess({ customers })
          ),
          catchError((error) =>
            of(CustomerActions.loadCustomersFailure({ error }))
          )
        )
      )
    )
  );

  loadCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomer),
      exhaustMap((action) =>
        this.customerService.getCustomer(action.id).pipe(
          map((customer: Customer) =>
            CustomerActions.loadCustomerSuccess({ customer })
          ),
          catchError((error) =>
            of(CustomerActions.loadCustomerFailure({ error }))
          )
        )
      )
    )
  );
}

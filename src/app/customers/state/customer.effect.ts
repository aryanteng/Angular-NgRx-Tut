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
            CustomerActions.loadCustomerSuccess({ id: customer.id })
          ),
          catchError((error) =>
            of(CustomerActions.loadCustomerFailure({ error }))
          )
        )
      )
    )
  );

  createCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.createCustomer),
      exhaustMap((action) =>
        this.customerService.createCustomer(action.customer).pipe(
          map((customer: Customer) =>
            CustomerActions.createCustomerSuccess({ customer })
          ),
          catchError((error) =>
            of(CustomerActions.createCustomerFailure({ error }))
          )
        )
      )
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.updateCustomer),
      exhaustMap((action) =>
        this.customerService.updateCustomer(action.customer).pipe(
          map((customer: Customer) =>
            CustomerActions.updateCustomerSuccess({ customer })
          ),
          catchError((error) =>
            of(CustomerActions.updateCustomerFailure({ error }))
          )
        )
      )
    )
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.deleteCustomer),
      exhaustMap((action) =>
        this.customerService.deleteCustomer(action.id).pipe(
          map((customer: Customer) =>
            CustomerActions.deleteCustomerSuccess({ id: customer.id })
          ),
          catchError((error) =>
            of(CustomerActions.deleteCustomerFailure({ error }))
          )
        )
      )
    )
  );
}

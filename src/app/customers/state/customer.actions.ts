import { createActionGroup, props } from '@ngrx/store';
import { Customer } from '../customer.model';

export const CustomerActions = createActionGroup({
  source: 'Customer',
  events: {
    'Load Customers': props<any>(),
    'Load Customers Success': props<{ customers: Customer[] }>(),
    'Load Customers Failure': props<{ error: string }>(),
  },
});

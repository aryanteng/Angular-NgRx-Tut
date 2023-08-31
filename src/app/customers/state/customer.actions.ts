import { createActionGroup, props } from '@ngrx/store';
import { Customer } from '../customer.model';

export const CustomerActions = createActionGroup({
  source: 'Customer',
  events: {
    'Load Customers': props<any>(),
    'Load Customers Success': props<{ customers: Customer[] }>(),
    'Load Customers Failure': props<{ error: string }>(),
    'Load Customer': props<{ id: number }>(),
    'Load Customer Success': props<{ id: number }>(),
    'Load Customer Failure': props<{ error: string }>(),
    'Create Customer': props<{ customer: Customer }>(),
    'Create Customer Success': props<{ customer: Customer }>(),
    'Create Customer Failure': props<{ error: string }>(),
    'Update Customer': props<{ customer: Customer }>(),
    'Update Customer Success': props<{ customer: Customer }>(),
    'Update Customer Failure': props<{ error: string }>(),
    'Delete Customer': props<{ id: number }>(),
    'Delete Customer Success': props<{ id: number }>(),
    'Delete Customer Failure': props<{ error: string }>(),
  },
});

import { createActionGroup, props } from '@ngrx/store';

export const CustomerActions = createActionGroup({
  source: 'Customer',
  events: {
    'Load Customers': props<any>(),
  },
});

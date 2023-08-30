import { Customer } from './../customer.model';
import { createReducer, on } from '@ngrx/store';
import { CustomerActions } from './customer.actions';

export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  loaded: boolean;
  error: string;
}

const initialState: CustomerState = {
  customers: [
    {
      id: 1,
      name: 'John Doe',
      phone: '1234567890',
      address: '123 Main St',
      membership: 'Platinum',
    },
  ],
  loading: false,
  loaded: false,
  error: '',
};

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.loadCustomers, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CustomerActions.loadCustomersSuccess, (state, { customers }) => {
    return {
      ...state,
      customers,
      loading: false,
      loaded: true,
    };
  }),
  on(CustomerActions.loadCustomersFailure, (state, { error }) => {
    return {
      ...state,
      customers: [],
      loading: false,
      loaded: true,
      error,
    };
  })
);

import { Customer } from './../customer.model';
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { CustomerActions } from './customer.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import * as fromRoot from '../../state/app-state';

export interface CustomerState extends EntityState<Customer> {
  selectedCustomerId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  customers: CustomerState;
}

export const customerAdapter: EntityAdapter<Customer> =
  createEntityAdapter<Customer>();

export const defaultCustomer: CustomerState = {
  ids: [],
  entities: {},
  selectedCustomerId: null,
  loading: false,
  loaded: false,
  error: '',
};

const initialState: CustomerState =
  customerAdapter.getInitialState(defaultCustomer);

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.loadCustomers, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CustomerActions.loadCustomersSuccess, (state, { customers }) => {
    return customerAdapter.addMany(customers, {
      ...state,
      loading: false,
      loaded: true,
    });
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

export const selectCustomerState =
  createFeatureSelector<CustomerState>('customers');

export const getCustomers = createSelector(
  selectCustomerState,
  customerAdapter.getSelectors().selectAll
);

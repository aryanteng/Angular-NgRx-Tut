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
  }),
  on(CustomerActions.loadCustomer, (state, { id }) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CustomerActions.loadCustomerSuccess, (state, { id }) => {
    return {
      ...state,
      selectedCustomerId: id,
    };
  }),
  on(CustomerActions.loadCustomerFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  on(CustomerActions.createCustomer, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CustomerActions.createCustomerSuccess, (state, { customer }) => {
    return customerAdapter.addOne(customer, state);
  }),
  on(CustomerActions.createCustomerFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error,
    };
  }),
  on(CustomerActions.updateCustomer, (state, { customer }) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CustomerActions.updateCustomerSuccess, (state, { customer }) => {
    return customerAdapter.updateOne(
      { changes: customer, id: customer.id },
      state
    );
  }),
  on(CustomerActions.updateCustomerFailure, (state, { error }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      error,
    };
  }),
  on(CustomerActions.deleteCustomer, (state, { id }) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CustomerActions.deleteCustomerSuccess, (state, { id }) => {
    return customerAdapter.removeOne(id, state);
  }),
  on(CustomerActions.deleteCustomerFailure, (state, { error }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
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

export const getCustomersLoading = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.loading
);

export const getCustomersLoaded = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.loaded
);

export const getError = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.error
);

export const getCurrentCustomerId = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.selectedCustomerId
);

export const getCurrentCustomer = createSelector(
  selectCustomerState,
  getCurrentCustomerId,
  (state) => state.entities[state.selectedCustomerId]
);

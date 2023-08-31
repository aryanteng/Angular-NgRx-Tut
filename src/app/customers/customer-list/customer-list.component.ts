import { selectCustomerState } from './../state/customer.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Customer } from '../customer.model';
import { CustomerActions } from '../state/customer.actions';
import { Observable } from 'rxjs';
import * as fromCustomer from '../state/customer.reducer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<Customer[]> = this.store.select(
    fromCustomer.getCustomers
  );
  error$: Observable<String> = this.store.select(fromCustomer.getError);
  constructor(private store: Store<fromCustomer.AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(CustomerActions.loadCustomers());
  }
  editCustomer(customer: Customer) {
    this.store.dispatch(CustomerActions.loadCustomer({ id: customer.id }));
  }
  deleteCustomer(customer: Customer) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.store.dispatch(CustomerActions.deleteCustomer({ id: customer.id }));
    }
  }
}

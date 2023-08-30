import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Customer } from '../customer.model';
import { CustomerActions } from '../state/customer.actions';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  constructor(private store: Store<any>) {}
  ngOnInit(): void {
    this.store.dispatch(CustomerActions.loadCustomers());
    this.store.subscribe((state) => {
      this.customers = state.customers.customers;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromCustomer from '../state/customer.reducer';
import { CustomerActions } from '../state/customer.actions';
import { Observable } from 'rxjs';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})
export class CustomerEditComponent implements OnInit {
  customer$: Observable<Customer> = this.store.select(
    fromCustomer.getCurrentCustomer
  );
  customerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<fromCustomer.AppState>
  ) {}
  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      membership: ['', Validators.required],
      id: null,
    });

    this.customer$.subscribe((currentCustomer) => {
      console.log('currentCustomer', currentCustomer);
      if (currentCustomer) {
        this.customerForm.patchValue({
          name: currentCustomer.name,
          phone: currentCustomer.phone,
          address: currentCustomer.address,
          membership: currentCustomer.membership,
          id: currentCustomer.id,
        });
      }
    });
  }

  updateCustomer() {
    const updatedCustomer: Customer = {
      name: this.customerForm.get('name').value,
      phone: this.customerForm.get('phone').value,
      address: this.customerForm.get('address').value,
      membership: this.customerForm.get('membership').value,
      id: this.customerForm.get('id').value,
    };
    if (this.customerForm.invalid) {
      return;
    }
    this.store.dispatch(
      CustomerActions.updateCustomer({ customer: updatedCustomer })
    );
    this.customerForm.reset();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customersUrl = 'http://localhost:3000/customers';
  constructor(private http: HttpClient) {}
  getCustomers() {
    return this.http.get<Customer[]>(this.customersUrl);
  }
}

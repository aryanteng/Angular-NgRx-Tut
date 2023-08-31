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
  getCustomer(id: number) {
    return this.http.get<Customer>(this.customersUrl + '/' + id);
  }
  createCustomer(customer: Customer) {
    return this.http.post<Customer>(this.customersUrl, customer);
  }
  updateCustomer(customer: Customer) {
    return this.http.patch<Customer>(
      `${this.customersUrl}/${customer.id}`,
      customer
    );
  }
  deleteCustomer(id: number) {
    return this.http.delete(`${this.customersUrl}/${id}`);
  }
}

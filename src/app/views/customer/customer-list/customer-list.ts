import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomerState } from './components/customer-state/customer-state';
import {
  NgbDropdownModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { customerData } from './data';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CustomerState,
    NgbPaginationModule,
    NgbDropdownModule,
    DecimalPipe,
    CommonModule
  ],
  templateUrl: './customer-list.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomerList {
  title = 'Customer List';
  customerList = customerData;
}

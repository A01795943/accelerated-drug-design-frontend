import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { currency } from '@common/constants';

@Component({
  selector: 'customer-state',
  standalone: true,
  imports: [],
  templateUrl: './customer-state.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomerState {
  currency=currency
}

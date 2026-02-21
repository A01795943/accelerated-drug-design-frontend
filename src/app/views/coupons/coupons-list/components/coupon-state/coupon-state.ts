import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { currency } from '@common/constants';

@Component({
  selector: 'coupon-state',
  standalone: true,
  imports: [],
  templateUrl: './coupon-state.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CouponState {
  currency=currency
}

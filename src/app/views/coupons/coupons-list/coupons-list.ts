import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CouponState } from './components/coupon-state/coupon-state';
import { CouponData } from './data';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule, DecimalPipe } from '@angular/common'

@Component({
  selector: 'app-coupons-list',
  standalone: true,
  imports: [CouponState,NgbPaginationModule,NgbDropdownModule,CommonModule,DecimalPipe],
  templateUrl: './coupons-list.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CouponsList {
  title = 'Coupons';

  couponList = CouponData;
}

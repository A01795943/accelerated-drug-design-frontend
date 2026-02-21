import { Component } from '@angular/core';
import { CouponInfo } from './components/coupon-info/coupon-info'
import { FlatpickrDirective } from '@core/directive/flatpickr.directive'

@Component({
  selector: 'app-coupons-add',
  standalone: true,
  imports: [CouponInfo,FlatpickrDirective],
  templateUrl: './coupons-add.html',
  styles: ``,
})
export class CouponsAdd {
  title = 'Coupons Add';
}

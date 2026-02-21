import { Route } from '@angular/router'
import { CouponsList } from './coupons-list/coupons-list'
import { CouponsAdd } from './coupons-add/coupons-add'

export const COUPON_ROUTES: Route[] = [
  {
    path: 'list',
    component: CouponsList,
    data: { title: 'Coupons List' },
  },
  {
    path: 'add',
    component: CouponsAdd,
    data: { title: 'Coupons Add' },
  }
]

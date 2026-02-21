import { DecimalPipe } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { currency } from '@common/constants';
import { cartData } from '@views/orders/data'

@Component({
  selector: 'checkout-summary',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './summary.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Summary {
  currency=currency
 cartList = cartData
}

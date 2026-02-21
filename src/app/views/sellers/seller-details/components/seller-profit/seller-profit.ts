import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { currency } from '@common/constants';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'seller-profit',
  standalone: true,
  imports: [NgbProgressbarModule],
  templateUrl: './seller-profit.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SellerProfit {
  currency=currency
}

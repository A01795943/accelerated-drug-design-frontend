import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { currency } from '@common/constants';
import { NgbDropdownModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'edit-seller-detail',
  standalone: true,
  imports: [NgbProgressbarModule,NgbDropdownModule],
  templateUrl: './seller-detail.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SellerDetail {
  currency=currency
}

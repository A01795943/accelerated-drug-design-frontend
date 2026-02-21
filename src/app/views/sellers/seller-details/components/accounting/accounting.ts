import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { currency } from '@common/constants';
import { NgbDropdownModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'seller-accounting',
  standalone: true,
  imports: [NgbProgressbarModule,NgbDropdownModule],
  templateUrl: './accounting.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Accounting {
  currency=currency
}

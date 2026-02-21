import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { currency } from '@common/constants';

@Component({
  selector: 'detail-feature',
  standalone: true,
  imports: [],
  templateUrl: './feature.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Feature {
  currency=currency
}

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { currency } from '@common/constants';

@Component({
  selector: 'detail-state',
  standalone: true,
  imports: [],
  templateUrl: './detail-state.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailState {
  currency=currency
}

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StateCard } from '@component/state-card/state-card';
import { orderState } from '../../data';

@Component({
  selector: 'received-order-state',
  standalone: true,
  imports: [StateCard],
  templateUrl: './order-state.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrderState {
  stateList = orderState;
}

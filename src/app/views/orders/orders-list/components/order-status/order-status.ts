import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StateCard } from '@component/state-card/state-card'
import { StatusData } from '@views/orders/data';

@Component({
  selector: 'order-status',
  standalone: true,
  imports: [StateCard],
  templateUrl: './order-status.html',
})
export class OrderStatus {
  stateList = StatusData;
}

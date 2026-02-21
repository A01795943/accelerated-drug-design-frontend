import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { purchaseState } from '../../data'
import { StateCard } from '@component/state-card/state-card'

@Component({
  selector: 'purchase-state',
  standalone: true,
  imports: [StateCard],
  templateUrl: './purchase-state.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PurchaseState {
  stateList = purchaseState
}

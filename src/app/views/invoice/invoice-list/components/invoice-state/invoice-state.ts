import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { invoiceState } from '../../data'
import { StateCard } from '@component/state-card/state-card'

@Component({
  selector: 'invoice-state',
  standalone: true,
  imports: [StateCard],
  templateUrl: './invoice-state.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InvoiceState {
  stateList = invoiceState
}

import { CommonModule } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import {
  NgbDropdownModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap'
import { InvoiceState } from './components/invoice-state/invoice-state'
import { InvoiceData } from './data'

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbPaginationModule,
    InvoiceState,
  ],
  templateUrl: './invoice-list.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InvoiceList {
  title = 'Invoices List';
  invoices = InvoiceData;
}

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { latestInvoice } from '../../data'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'customer-latest-invoice',
  standalone: true,
  imports: [NgbDropdownModule,CommonModule],
  templateUrl: './latest-invoice.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LatestInvoice {
  invoiceList = latestInvoice
}

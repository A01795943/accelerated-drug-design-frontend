import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PurchaseState } from './component/purchase-state/purchase-state';
import { purchaseOrders } from './data';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [PurchaseState, DecimalPipe, CommonModule,NgbPaginationModule,NgbDropdownModule],
  templateUrl: './purchase-order.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PurchaseOrder {
  title = 'Purchase Order';
  orderList = purchaseOrders;
}

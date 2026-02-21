import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OrderState } from './components/order-state/order-state'
import { ReceivedOrderData } from './data'
import { CommonModule, DecimalPipe } from '@angular/common'
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-received-orders',
  standalone: true,
  imports: [OrderState,CommonModule,DecimalPipe,NgbDropdownModule,NgbPaginationModule],
  templateUrl: './received-orders.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReceivedOrders {
  title = "Received Orders"
  orderList = ReceivedOrderData
}

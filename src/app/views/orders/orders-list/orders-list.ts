import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OrderList } from '../data';
import { CommonModule, DecimalPipe } from '@angular/common'
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { OrderStatus } from './components/order-status/order-status'

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule,DecimalPipe,NgbDropdownModule,NgbPaginationModule,OrderStatus],
  templateUrl: './orders-list.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrdersList {
  title = 'Orders List';
  orders = OrderList;
}

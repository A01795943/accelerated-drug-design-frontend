import { Component } from '@angular/core';
import { OrderProgress } from './components/order-progress/order-progress';
import { OrderProduct } from './components/order-product/order-product';
import { OrderTimeline } from './components/order-timeline/order-timeline';
import { OrderSummary } from './components/order-summary/order-summary';
import { CustomerDetail } from './components/customer-detail/customer-detail';
import { OrderPayment } from './components/order-payment/order-payment';
import { OrderState } from './components/order-state/order-state'

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    OrderProgress,
    OrderProduct,
    OrderTimeline,
    OrderSummary,
    CustomerDetail,
    OrderPayment,
    OrderState
  ],
  templateUrl: './order-detail.html',
  styles: ``,
})
export class OrderDetail {
  title = 'Order Details';
}

import { Route } from '@angular/router'
import { OrdersList } from './orders-list/orders-list'
import { OrderDetail } from './order-detail/order-detail'
import { OrderCart } from './order-cart/order-cart'
import { OrderCheckout } from './order-checkout/order-checkout'

export const ORDER_ROUTES: Route[] = [
  {
    path: 'list',
    component: OrdersList,
    data: { title: 'Orders List' },
  },
  {
    path: 'detail',
    component: OrderDetail,
    data: { title: 'Order Details' },
  },
  {
    path: 'cart',
    component: OrderCart,
    data: { title: 'Order Cart' },
  },
  {
    path: 'checkout',
    component: OrderCheckout,
    data: { title: 'Order Checkout' },
  },
]

import { Route } from '@angular/router'
import { ReceivedOrders } from './received-orders/received-orders'
import { Warehouse } from './warehouse/warehouse'

export const INVENTORY_ROUTES: Route[] = [
  {
    path: 'warehouse',
    component: Warehouse,
    data: { title: 'Warehouse List' },
  },
  {
    path: 'received-order',
    component: ReceivedOrders,
    data: { title: 'Received Orders' },
  }
]

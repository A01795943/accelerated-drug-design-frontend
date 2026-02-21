import { Route } from '@angular/router'
import { PurchaseList } from './purchase-list/purchase-list'
import { PurchaseOrder } from './purchase-order/purchase-order'
import { PurchaseReturns } from './purchase-returns/purchase-returns'

export const PURCHASE_ROUTES: Route[] = [
  {
    path: 'list',
    component: PurchaseList,
    data: { title: 'Purchase List' },
  },
  {
    path: 'order',
    component: PurchaseOrder,
    data: { title: 'Purchase Order' },
  },
  {
    path: 'returns',
    component: PurchaseReturns,
    data: { title: 'Return List' },
  }
]

import { Route } from '@angular/router'
import { CustomerList } from './customer-list/customer-list'
import { CustomerDetail } from './customer-detail/customer-detail'

export const CUSTOMERS_ROUTES: Route[] = [
  {
    path: 'list',
    component: CustomerList,
    data: { title: 'Customer List' },
  },
  {
    path: 'detail',
    component: CustomerDetail,
    data: { title: 'Customer Details' },
  }
]

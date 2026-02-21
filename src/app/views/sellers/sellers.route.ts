import { Route } from '@angular/router'
import { SellerList } from './seller-list/seller-list'
import { SellerDetails } from './seller-details/seller-details'
import { SellerEdit } from './seller-edit/seller-edit'
import { SellerAdd } from './seller-add/seller-add'

export const SELLERS_ROUTES: Route[] = [
  {
    path: 'list',
    component: SellerList,
    data: { title: 'Sellers List' },
  },
  {
    path: 'details',
    component: SellerDetails,
    data: { title: 'Seller Details' },
  },
  {
    path: 'edit',
    component: SellerEdit,
    data: { title: 'Seller Edit' },
  },
  {
    path: 'add',
    component: SellerAdd,
    data: { title: 'Seller Add' },
  }
]

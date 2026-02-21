import { Route } from '@angular/router'
import { List } from './list/list'
import { Grid } from './grid/grid'
import { Details } from './details/details'
import { Edit } from './edit/edit'
import { Add } from './add/add'

export const PRODUCT_ROUTES: Route[] = [
  {
    path: 'list',
    component: List,
    data: { title: 'Product List' },
  },
  {
    path: 'grid',
    component: Grid,
    data: { title: 'Product Grid' },
  },
  {
    path: 'details',
    component: Details,
    data: { title: 'Invoices List' },
  },
  {
    path: 'edit',
    component: Edit,
    data: { title: 'Product Edit' },
  },
  {
    path: 'add',
    component: Add,
    data: { title: 'Create Product' },
  },
]

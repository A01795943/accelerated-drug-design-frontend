import { Route } from '@angular/router'
import { Basic } from './basic/basic'
import { Datatable } from './datatable/datatable'

export const TABLES_ROUTES: Route[] = [
  {
    path: 'basic',
    component: Basic,
    data: { title: 'Basic Tables' },
  },
  {
    path: 'datatable',
    component: Datatable,
    data: { title: 'DataTable' },
  }
]

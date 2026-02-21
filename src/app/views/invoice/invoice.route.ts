import { Route } from '@angular/router'
import { InvoiceList } from './invoice-list/invoice-list'
import { InvoiceDetails } from './invoice-details/invoice-details'
import { InvoiceAdd } from './invoice-add/invoice-add'

export const INVOICE_ROUTES: Route[] = [
  {
    path: 'list',
    component: InvoiceList,
    data: { title: 'Invoices List' },
  },
  {
    path: 'details',
    component: InvoiceDetails,
    data: { title: 'Invoice Details' },
  },
  {
    path: 'add',
    component: InvoiceAdd,
    data: { title: 'Invoices Create' },
  }
]

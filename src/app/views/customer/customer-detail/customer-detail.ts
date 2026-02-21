import { Component } from '@angular/core';
import { Detail } from './components/detail/detail'
import { LatestInvoice } from './components/latest-invoice/latest-invoice'
import { DetailState } from './components/detail-state/detail-state'
import { TransactionHistory } from './components/transaction-history/transaction-history'
import { EarnPoint } from './components/earn-point/earn-point'
import { AccountChart } from './components/account-chart/account-chart'

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [Detail,LatestInvoice,DetailState,TransactionHistory,EarnPoint,AccountChart],
  templateUrl: './customer-detail.html',
  styles: ``,
})
export class CustomerDetail {
  title = 'Customer Details';
}

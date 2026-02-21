import { Component } from '@angular/core';
import { transactionHistory } from '../../data';
import { CommonModule, DecimalPipe } from '@angular/common'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'customer-transaction-history',
  standalone: true,
  imports: [DecimalPipe,CommonModule,NgbPaginationModule],
  templateUrl: './transaction-history.html',
  styles: ``,
})
export class TransactionHistory {
  transactionList = transactionHistory;
}


import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { SimplebarAngularModule } from 'simplebar-angular'
import { TransactionsList } from '../../data'

@Component({
  selector: 'widget-transaction',
  standalone: true,
  imports: [SimplebarAngularModule, CommonModule],
  templateUrl: './widget-transaction.html',
  styles: ``,
})
export class WidgetTransaction {
  transactions = TransactionsList
}

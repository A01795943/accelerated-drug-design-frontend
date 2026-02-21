import { CommonModule, DecimalPipe } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReturnState } from './component/return-state/return-state'
import { PurchaseReturnList } from './data'
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-purchase-returns',
  standalone: true,
  imports: [CommonModule,ReturnState,DecimalPipe,NgbPaginationModule,NgbDropdownModule],
  templateUrl: './purchase-returns.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PurchaseReturns {
  title = 'Return List';
  returnList = PurchaseReturnList
}

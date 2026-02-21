import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { inventoryState, warehouseList } from './data'
import { DecimalPipe } from '@angular/common'
import { StateCard } from '@component/state-card/state-card'

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [StateCard,NgbDropdownModule,DecimalPipe,NgbPaginationModule],
  templateUrl: './warehouse.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Warehouse {
  title="WareHouse List"
  warehouses = warehouseList
  stateList = inventoryState;
}

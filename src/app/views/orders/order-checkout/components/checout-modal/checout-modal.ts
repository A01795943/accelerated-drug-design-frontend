import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { currency } from '@common/constants';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-checout-modal',
  standalone: true,
  imports: [NgbTooltipModule],
  templateUrl: './checout-modal.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChecoutModal {
  currency=currency
}

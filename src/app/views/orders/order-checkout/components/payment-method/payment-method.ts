import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'checkout-payment-method',
  standalone: true,
  imports: [NgbCollapseModule],
  templateUrl: './payment-method.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaymentMethod {
  isCollapsed: boolean = true;
  isCollapsed1: boolean = false;
}

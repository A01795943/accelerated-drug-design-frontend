import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { PersonalDetail } from './components/personal-detail/personal-detail';
import { ShippingDetail } from './components/shipping-detail/shipping-detail';
import { PaymentMethod } from './components/payment-method/payment-method';
import { PromoCode } from './components/promo-code/promo-code';
import { Summary } from './components/summary/summary';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChecoutModal } from './components/checout-modal/checout-modal';

@Component({
  selector: 'app-order-checkout',
  standalone: true,
  imports: [
    PersonalDetail,
    ShippingDetail,
    PaymentMethod,
    PromoCode,
    Summary,
    RouterLink,
  ],
  templateUrl: './order-checkout.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrderCheckout {
  title = 'Order Checkout';

  private modalService = inject(NgbModal);

  openModal() {
    this.modalService.open(ChecoutModal);
  }
}

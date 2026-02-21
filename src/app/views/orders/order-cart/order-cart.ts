import { Component, inject, type TemplateRef } from '@angular/core';
import { Summary } from './components/summary/summary';
import { CartList } from './components/cart-list/cart-list';
import { RouterLink } from '@angular/router';
import { ToastService } from '@core/services/toast-service';
import { ToastsContainer } from '@component/toasts-container';

@Component({
  selector: 'app-order-cart',
  standalone: true,
  imports: [CartList, Summary, RouterLink, ToastsContainer],
  templateUrl: './order-cart.html',
  styles: ``,
})
export class OrderCart {
  title = 'Order Cart';
  total: number = 0;

  toastService = inject(ToastService);

  showSuccess(template: TemplateRef<any>) {
    this.toastService.show({
      template,
      classname: 'bg-success text-light rounded-0 width-auto',
      delay: 10000,
    });
  }

  getTotal($event: number) {
    this.total = $event;
  }
}

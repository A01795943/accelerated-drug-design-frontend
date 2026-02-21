import { Component } from '@angular/core';
import { currency } from '@common/constants';
import { QuantityControlDirective } from '@core/directive/quantity-control.directive'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'detail-product-info',
  standalone: true,
  imports: [QuantityControlDirective,NgbRatingModule],
  templateUrl: './product-info.html',
  styles: ``
})
export class ProductInfo {
  currency=currency
}

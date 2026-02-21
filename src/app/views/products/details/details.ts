import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ItemDetail } from './components/item-detail/item-detail';
import { TopReview } from './components/top-review/top-review';
import { ProductInfo } from './components/product-info/product-info';
import { Feature } from './components/feature/feature';
import { ProductImage } from './components/product-image/product-image';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    ProductImage,
    ItemDetail,
    TopReview,
    ProductInfo,
    Feature,
  ],
  templateUrl: './details.html',
})
export class Details {
  title = 'PRODUCT DETAILS';
}

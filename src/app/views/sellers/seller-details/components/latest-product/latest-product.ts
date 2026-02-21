import { Component } from '@angular/core';
import { latestProduct } from '../../data';
import { CommonModule } from '@angular/common'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'seller-latest-product',
  standalone: true,
  imports: [CommonModule,NgbDropdownModule],
  templateUrl: './latest-product.html',
  styles: ``,
})
export class LatestProduct {
  productList = latestProduct;
}

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LatestProduct } from './components/latest-product/latest-product';
import { Accounting } from './components/accounting/accounting';
import { CompanyReview } from './components/company-review/company-review';
import { SalesAnalytic } from './components/sales-analytic/sales-analytic';
import { SellerProfit } from './components/seller-profit/seller-profit';
import { SellerInfo } from './components/seller-info/seller-info';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-seller-details',
  standalone: true,
  imports: [
    SellerInfo,
    SellerProfit,
    SalesAnalytic,
    CompanyReview,
    LatestProduct,
    Accounting,
    NgbRatingModule
  ],
  templateUrl: './seller-details.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SellerDetails {
  title = 'Seller Details';
}

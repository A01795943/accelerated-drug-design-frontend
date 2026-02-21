import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { sellerData } from './data';
import {
  NgbDropdownModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ToAlphaNumberPipe } from '@core/to-alpha-number.pipe'

@Component({
  selector: 'app-seller-list',
  standalone: true,
  imports: [NgbDropdownModule, NgbProgressbarModule,ToAlphaNumberPipe],
  templateUrl: './seller-list.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SellerList {
  title = 'Sellers List';
  sellerList = sellerData;
}

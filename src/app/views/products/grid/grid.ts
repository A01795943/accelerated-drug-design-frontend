import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductList } from '../data';
import { Filter } from './component/filter/filter';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule, NgbPaginationModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    Filter,
    DecimalPipe,
    CommonModule,
    RouterLink,
    NgbPaginationModule,
    NgbRatingModule,
    NgbDropdownModule
  ],
  templateUrl: './grid.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: `
    .text-ellipsis {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      max-width: 200px; /* Adjust the width as needed */
    }
  `,
})
export class Grid {
  title = 'PRODUCT GRID';
  products = ProductList;
}

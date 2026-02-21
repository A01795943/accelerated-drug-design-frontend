import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { categoryList } from '../data';
import { Categories } from './components/categories/categories'
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [Categories,NgbDropdownModule,NgbPaginationModule,RouterLink],
  templateUrl: './category-list.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoryList {
  title = 'CATEGORIES LIST';
  categoryData = categoryList;
}

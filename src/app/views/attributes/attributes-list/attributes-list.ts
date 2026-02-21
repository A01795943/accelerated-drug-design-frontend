import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AttributeData } from './data';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-attributes-list',
  standalone: true,
  imports: [NgbDropdownModule,NgbPaginationModule],
  templateUrl: './attributes-list.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AttributesList {
  title = 'Attribute List';
  attributes = AttributeData;
}

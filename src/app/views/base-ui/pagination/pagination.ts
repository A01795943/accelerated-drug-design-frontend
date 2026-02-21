import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgbPaginationModule,UIExamplesList],
  templateUrl: './pagination.html',
  styles: ``
})
export class Pagination {
title="pagination"
}

import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';

@Component({
  selector: 'app-list-group',
  standalone: true,
  imports: [UIExamplesList],
  templateUrl: './list-group.html',
  styles: ``
})
export class ListGroup {
title="List Group"
}

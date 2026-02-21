import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [UIExamplesList],
  templateUrl: './breadcrumb.html',
  styles: ``
})
export class Breadcrumb {
  title = "Breadcrumb"
}

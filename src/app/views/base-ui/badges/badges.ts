import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';

@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [UIExamplesList],
  templateUrl: './badges.html',
  styles: ``
})
export class Badges {
  title = "Badge"
}

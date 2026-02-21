import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';

@Component({
  selector: 'app-placeholders',
  standalone: true,
  imports: [UIExamplesList],
  templateUrl: './placeholders.html',
  styles: ``
})
export class Placeholders {
title="placeholders"
}

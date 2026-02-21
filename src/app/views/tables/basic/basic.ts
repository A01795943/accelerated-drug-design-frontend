import { Component } from '@angular/core';
import { currentYear } from '@common/constants';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [UIExamplesList],
  templateUrl: './basic.html',
  styles: ``
})
export class Basic {
title="Basic Tables"
currentYear = currentYear
}

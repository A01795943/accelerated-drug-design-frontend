import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tooltips',
  standalone: true,
  imports: [NgbTooltipModule,UIExamplesList],
  templateUrl: './tooltips.html',
  styles: ``
})
export class Tooltips {
title="Tooltips"
}

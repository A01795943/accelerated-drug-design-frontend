import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popovers',
  standalone: true,
  imports: [NgbPopoverModule,UIExamplesList],
  templateUrl: './popovers.html',
  styles: ``
})
export class Popovers {
title="popovers"
}

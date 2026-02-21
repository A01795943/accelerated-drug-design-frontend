import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [NgbProgressbarModule,UIExamplesList],
  templateUrl: './progress.html',
  styles: ``
})
export class Progress {
title="progress"
}

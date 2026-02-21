import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [NgbAccordionModule,UIExamplesList],
  templateUrl: './accordion.html',
  styles: ``
})
export class Accordion {
  title='Accordion'
}

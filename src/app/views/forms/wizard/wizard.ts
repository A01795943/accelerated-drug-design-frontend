import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [NgbNavModule],
  templateUrl: './wizard.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Wizard {
  title = "Wizard"
  active = 1
  activeId = 1
}

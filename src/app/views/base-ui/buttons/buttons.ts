import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [UIExamplesList,NgbDropdownModule],
  templateUrl: './buttons.html',
  styles: ``
})
export class Buttons {
  title = "Buttons"
}

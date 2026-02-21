import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [UIExamplesList,NgbDropdownModule],
  templateUrl: './dropdown.html',
  styles: ``
})
export class Dropdown {
  title = "Dropdown"
}

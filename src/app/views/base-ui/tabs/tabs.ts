import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [UIExamplesList,NgbNavModule],
  templateUrl: './tabs.html',
  styles: ``
})
export class Tabs {
  title = "Tabs"
}

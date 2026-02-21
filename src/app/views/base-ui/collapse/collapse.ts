import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-collapse',
  standalone: true,
  imports: [UIExamplesList,NgbCollapseModule],
  templateUrl: './collapse.html',
  styles: ``
})
export class Collapse {
  title = "Collapse"
  isCollapsed = true
  isHorizontal = true
  isFirstToggle = true
  isSecondToggle = true
}

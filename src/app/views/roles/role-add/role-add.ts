import { Component } from '@angular/core';
import { SelectFormInputDirective } from '@core/directive/select-form-input.directive'

@Component({
  selector: 'app-role-add',
  standalone: true,
  imports: [SelectFormInputDirective],
  templateUrl: './role-add.html',
  styles: ``,
})
export class RoleAdd {
  title = 'Role Add';
}

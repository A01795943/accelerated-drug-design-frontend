import { Component } from '@angular/core';
import { SelectFormInputDirective } from '@core/directive/select-form-input.directive'

@Component({
  selector: 'app-role-edit',
  standalone: true,
  imports: [SelectFormInputDirective],
  templateUrl: './role-edit.html',
  styles: ``,
})
export class RoleEdit {
  title = 'Role Edit';
}

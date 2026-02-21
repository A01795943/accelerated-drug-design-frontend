import { Component } from '@angular/core';
import { SelectFormInputDirective } from '@core/directive/select-form-input.directive'

@Component({
  selector: 'app-attributes-edit',
  standalone: true,
  imports: [SelectFormInputDirective],
  templateUrl: './attributes-edit.html',
  styles: ``,
})
export class AttributesEdit {
  title = 'Attribute Edit';
}

import { Component } from '@angular/core';
import { SelectFormInputDirective } from '@core/directive/select-form-input.directive'

@Component({
  selector: 'app-attributes-add',
  standalone: true,
  imports: [SelectFormInputDirective],
  templateUrl: './attributes-add.html',
  styles: ``,
})
export class AttributesAdd {
  title = 'Attribute Add';
}

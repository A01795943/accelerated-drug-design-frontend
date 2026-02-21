import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SelectFormInputDirective } from '@core/directive/select-form-input.directive'

@Component({
  selector: 'general-setting',
  standalone: true,
  imports: [SelectFormInputDirective],
  templateUrl: './general-setting.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneralSetting {

}

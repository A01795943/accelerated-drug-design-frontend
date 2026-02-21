import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SelectFormInputDirective } from '@core/directive/select-form-input.directive'

@Component({
  selector: 'localization-setting',
  standalone: true,
  imports: [SelectFormInputDirective],
  templateUrl: './localization-setting.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalizationSetting {

}

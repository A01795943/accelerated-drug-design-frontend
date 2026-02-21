import { Component } from '@angular/core';
import { SelectFormInputDirective } from '@core/directive/select-form-input.directive'

@Component({
  selector: 'add-info',
  standalone: true,
  imports: [SelectFormInputDirective],
  templateUrl: './info.html',
  styleUrl: './info.scss'
})
export class Info {

}

import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';
import { SelectFormInputDirective } from '@core/directive/select-form-input.directive';

@Component({
  selector: 'app-choices',
  standalone: true,
  imports: [UIExamplesList,SelectFormInputDirective],
  templateUrl: './choices.html',
  styles: ``
})
export class Choices {
title="Form Select"
}

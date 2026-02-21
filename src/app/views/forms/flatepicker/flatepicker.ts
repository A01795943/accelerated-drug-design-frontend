import { Component } from '@angular/core';
import { currentYear } from '@common/constants';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';
import { FlatpickrDirective } from '@core/directive/flatpickr.directive';

@Component({
  selector: 'app-flatepicker',
  standalone: true,
  imports: [FlatpickrDirective,UIExamplesList],
  templateUrl: './flatepicker.html',
  styles: ``
})
export class Flatepicker {
title="Flatpicker"
currentYear = currentYear
}

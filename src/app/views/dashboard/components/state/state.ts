import { CommonModule } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WidgetCard } from '@component/widget-card/widget-card'
import { stateData } from '@views/dashboard/data';

@Component({
  selector: 'dashboard-state',
  standalone: true,
  imports: [CommonModule,WidgetCard],
  templateUrl: './state.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class State {
  stateList = stateData;
}

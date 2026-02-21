import { Component } from '@angular/core';
import { stateData } from '../../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'widget-state3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widget-state3.html',
  styles: ``,
})
export class WidgetState3 {
  stateList = stateData;
}

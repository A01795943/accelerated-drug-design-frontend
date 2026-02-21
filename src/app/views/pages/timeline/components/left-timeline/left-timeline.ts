import { Component } from '@angular/core'
import { LeftTimeLine } from '../../data'

@Component({
  selector: 'left-timeline',
  standalone: true,
  imports: [],
  templateUrl: './left-timeline.html',
  styles: ``,
})
export class LeftTimeline {
  timelineList = LeftTimeLine
}

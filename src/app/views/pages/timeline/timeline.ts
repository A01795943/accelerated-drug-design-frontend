import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LeftTimeline } from './components/left-timeline/left-timeline';
import { TimelineData } from './data';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [LeftTimeline, CommonModule],
  templateUrl: './timeline.html',
  styles: ``,
})
export class Timeline {
  title = 'Timeline';

  timelineList = TimelineData;
}

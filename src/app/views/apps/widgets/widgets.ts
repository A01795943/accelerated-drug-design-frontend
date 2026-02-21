import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Conversation } from './components/conversation/conversation';
import { Performance } from './components/performance/performance';
import { WidgetState2 } from './components/widget-state2/widget-state2';
import { WidgetState3 } from './components/widget-state3/widget-state3';
import { WidgetFriendRequest } from './components/widget-friend-request/widget-friend-request';
import { WidgetTask } from './components/widget-task/widget-task';
import { WidgetTransaction } from './components/widget-transaction/widget-transaction';
import { RecentProject } from './components/recent-project/recent-project';
import { Schedule } from './components/schedule/schedule';
import { WidgetState } from './components/widget-state/widget-state';
import { stateData } from '@views/dashboard/data';
import { WidgetCard } from '@component/widget-card/widget-card';

@Component({
  selector: 'app-widgets',
  standalone: true,
  imports: [
    Conversation,
    Performance,
    WidgetCard,
    WidgetState,
    WidgetState2,
    WidgetState3,
    WidgetFriendRequest,
    WidgetTask,
    WidgetTransaction,
    RecentProject,
    Schedule,
  ],
  templateUrl: './widgets.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Widgets {
  title = 'Widgets';

  stateList = stateData;
}

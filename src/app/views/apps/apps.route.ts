import { Route } from '@angular/router'
import { Chat } from './chat/chat'
import { Email } from './email/email'
import { Calendar } from './calendar/calendar'
import { Todo } from './todo/todo'
import { Widgets } from './widgets/widgets'

export const APPS_ROUTES: Route[] = [
  {
    path: 'chat',
    component: Chat,
    data: { title: 'Chat' },
  },
  {
    path: 'email',
    component: Email,
    data: { title: 'Inbox' },
  },
  {
    path: 'calendar',
    component: Calendar,
    data: { title: 'Calendar' },
  },
  {
    path: 'todo',
    component: Todo,
    data: { title: 'Todo' },
  },
  {
    path: 'widgets',
    component: Widgets,
    data: { title: 'Widgets' },
  }
]

import { Route } from '@angular/router'
import { Boxicons } from './boxicons/boxicons'
import { Solar } from './solar/solar'

export const ICONS_ROUTES: Route[] = [
  {
    path: 'boxicons',
    component: Boxicons,
    data: { title: 'Boxicons' },
  },
  {
    path: 'solar',
    component: Solar,
    data: { title: 'Solar Icons' },
  }
]

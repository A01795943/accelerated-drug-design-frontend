import { Route } from '@angular/router'
import { Comingsoon } from './comingsoon/comingsoon'
import { Maintenance } from './maintenance/maintenance'
import { Error404 } from './error-404/error-404'


export const OTHER_PAGE_ROUTES: Route[] = [
  {
    path: 'comingsoon',
    component: Comingsoon,
    data: { title: 'Coming Soon' },
  },
  {
    path: 'maintenance',
    component: Maintenance,
    data: { title: 'Maintenance' },
  },
  {
    path: '404',
    component: Error404,
    data: { title: 'Page Not Found - 404' },
  }
]

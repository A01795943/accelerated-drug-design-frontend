import { Route } from '@angular/router';
import { adminGuard } from './users/admin.guard';

export const VIEW_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'projects/list',
    pathMatch: 'full',
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./projects/projects.route').then((mod) => mod.PROJECTS_ROUTES),
  },
  {
    path: 'users',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./users/users.route').then((mod) => mod.USERS_ROUTES),
  },
];

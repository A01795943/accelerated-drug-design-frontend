import { Route } from '@angular/router';

export const USERS_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./user-list/user-list').then((m) => m.UserList),
    data: { title: 'Usuarios' },
  },
];

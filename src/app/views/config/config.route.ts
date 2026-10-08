import { Route } from '@angular/router';

export const CONFIG_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'core-instances',
    pathMatch: 'full',
  },
  {
    path: 'core-instances',
    loadComponent: () =>
      import('./core-instances/core-instances').then((m) => m.CoreInstances),
    data: { title: 'Instancias del core' },
  },
];

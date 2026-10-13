import { Route } from '@angular/router';

export const CONFIG_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'core-instances',
    pathMatch: 'full',
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings').then((m) => m.SettingsPage),
    data: { title: 'Ajustes' },
  },
  {
    path: 'core-instances',
    redirectTo: '/cores',
    pathMatch: 'full',
  },
];

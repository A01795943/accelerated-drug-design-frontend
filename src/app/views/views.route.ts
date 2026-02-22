import { Route } from '@angular/router';

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
];

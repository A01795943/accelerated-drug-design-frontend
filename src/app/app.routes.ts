import { Routes, Router, type UrlTree } from '@angular/router'
import { Layout } from './layouts/layout/layout'
import { AuthLayout } from '@layouts/auth-layout/auth-layout'
import { AuthenticationService } from './core/services/auth.service'
import { inject } from '@angular/core'
import { map, take } from 'rxjs/operators'

function authGuard() {
  const router = inject(Router)
  const auth = inject(AuthenticationService)
  if (!auth.session) {
    return router.createUrlTree(['/auth/signin'])
  }
  return auth.loadCurrentUser().pipe(
    take(1),
    map((user) => (user ? true : router.createUrlTree(['/auth/signin'])) as UrlTree | boolean)
  )
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'projects/list',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    loadChildren: () =>
      import('./views/views.route').then((mod) => mod.VIEW_ROUTES),
  },
  {
    path: 'auth',
    component: AuthLayout,
    loadChildren: () =>
      import('./views/auth/auth.route').then((mod) => mod.AUTH_ROUTES),
  },
]

import { Routes, Router, type UrlTree, RedirectCommand } from '@angular/router'
import { Layout } from './layouts/layout/layout'
import { AuthLayout } from '@layouts/auth-layout/auth-layout'
import { AuthenticationService } from './core/services/auth.service'
import { inject } from '@angular/core'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Layout,
    canActivate: [
      (url: any) => {
        const router = inject(Router)
        const currentUser = inject(AuthenticationService)
        if (!currentUser.session) {
          return router.createUrlTree(['/auth/signin'], {
            queryParams: { returnUrl: url._routerState.url },
          })
        }
        return true
      },
    ],
    loadChildren: () =>
      import('./views/views.route').then((mod) => mod.VIEW_ROUTES),
  },
  {
    path: 'auth',
    component: AuthLayout,
    loadChildren: () =>
      import('./views/auth/auth.route').then((mod) => mod.AUTH_ROUTES),
  },
  {
    path: 'pages',
    component: AuthLayout,
    loadChildren: () =>
      import('./views/other-pages/other-page.route').then(
        (mod) => mod.OTHER_PAGE_ROUTES
      ),
  },
]

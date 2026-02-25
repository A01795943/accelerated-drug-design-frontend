import { Inject, Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, exhaustMap, map, tap } from 'rxjs/operators'
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutSuccess,
} from './authentication.actions'
import { AuthenticationService } from '@/app/core/services/auth.service'

@Injectable()
export class AuthenticationEffects {
  login$ = createEffect(() =>
  this.actions$.pipe(
      ofType(login),
      exhaustMap(({ username, password }) => {
        return this.AuthenticationService.login(username, password).pipe(
          map((user) => {
            if (user) {
              const returnUrl =
                this.route.snapshot.queryParams['returnUrl'] || '/'
                this.router.navigateByUrl(returnUrl)
              }
              return loginSuccess({ user })
            }),
          catchError((err) =>
            of(loginFailure({ error: err?.error?.error || err?.message || 'Login failed' }))
          )
        )
      })
    )
  )

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      exhaustMap(() => {
        this.AuthenticationService.logout()
        this.router.navigate(['/auth/signin'])
        return of(logoutSuccess())
      })
    )
  )

  constructor(
    @Inject(Actions) private actions$: Actions,
    private AuthenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}

import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import { CookieService } from 'ngx-cookie-service'
import { environment } from '@environment/environment'
import type { User } from '@store/authentication/auth.model'

export interface LoginResponse {
  token: string
  id: number
  username: string
  email: string
  role: string
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user: User | null = null

  public readonly authSessionKey = '_LARKON_AUTH_SESSION_KEY_'
  private cookieService = inject(CookieService)
  private http = inject(HttpClient)

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, { username, password }).pipe(
      map((res) => {
        if (res?.token) {
          this.user = {
            id: res.id,
            username: res.username,
            email: res.email,
            role: (res.role?.toLowerCase() === 'admin' ? 'admin' : 'user') as 'admin' | 'user',
            token: res.token,
          }
          this.saveSession(res.token)
        }
        return this.user!
      })
    )
  }

  changePassword(currentPassword: string, newPassword: string) {
    return this.http.post<void>(`${environment.apiUrl}/api/auth/change-password`, {
      currentPassword,
      newPassword,
    })
  }

  logout(): void {
    // remove user from cookie to log user out
    this.removeSession()
    this.user = null
  }

  get session(): string {
    return this.cookieService.get(this.authSessionKey)
  }

  saveSession(token: string): void {
    this.cookieService.set(this.authSessionKey, token)
  }

  removeSession(): void {
    this.cookieService.delete(this.authSessionKey)
  }

  /** Load current user from backend when we have a session (e.g. after refresh). */
  loadCurrentUser(): Observable<User | null> {
    if (this.user) return of(this.user)
    if (!this.session) return of(null)
    return this.http.get<LoginResponse>(`${environment.apiUrl}/api/auth/me`).pipe(
      map((res) => {
        this.user = {
          id: res.id,
          username: res.username,
          email: res.email,
          role: (res.role?.toLowerCase() === 'admin' ? 'admin' : 'user') as 'admin' | 'user',
          token: this.session,
        }
        return this.user
      }),
      catchError(() => of(null))
    )
  }
}

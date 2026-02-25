import { createReducer, on } from '@ngrx/store'
import {
  clearLoginError,
  login,
  loginFailure,
  loginSuccess,
  logout,
} from './authentication.actions'
import type { User } from './auth.model'

export type AuthenticationState = {
  isLoggedIn: boolean
  user: User | null
  error: string | null
}

const initialState: AuthenticationState = {
  isLoggedIn: false,
  user: null,
  error: null,
}

export const authenticationReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, error: null })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    user,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({ ...state, error })),
  on(clearLoginError, (state) => ({ ...state, error: null })),

  on(logout, (state) => ({ ...state, user: null }))
)

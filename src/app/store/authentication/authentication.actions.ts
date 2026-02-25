import { createAction, props } from '@ngrx/store'
import type { User } from './auth.model'

// login action
export const login = createAction(
  '[Authentication] Login',
  props<{ username: string; password: string }>()
)
export const loginSuccess = createAction(
  '[Authentication] Login Success',
  props<{ user: User }>()
)
export const loginFailure = createAction(
  '[Authentication] Login Failure',
  props<{ error: string }>()
)
export const clearLoginError = createAction('[Authentication] Clear Login Error')

// logout action
export const logout = createAction('[Authentication] Logout')

export const logoutSuccess = createAction('[Auth] Logout Success')

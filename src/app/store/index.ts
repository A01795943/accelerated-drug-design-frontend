import { ActionReducerMap } from '@ngrx/store'
import { LayoutState, layoutReducer } from './layout/layout-reducers'
import { calendarReducer, type CalendarState } from './calendar/calendar.reducer'
import { authenticationReducer, type AuthenticationState } from './authentication/authentication.reducer'

export interface RootReducerState {
  layout: LayoutState
  Calendar: CalendarState
  authentication: AuthenticationState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  layout: layoutReducer,
  Calendar: calendarReducer,
  authentication: authenticationReducer,
}

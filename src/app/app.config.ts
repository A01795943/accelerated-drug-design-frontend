import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'

import { DecimalPipe } from '@angular/common'
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { CalendarEffects } from '@store/calendar/calendar.effects'
import { localStorageSyncReducer } from '@store/layout/layout-reducers'
import { provideToastr } from 'ngx-toastr'
import { routes } from './app.routes'
import { rootReducer } from './store'
import { authInterceptor } from './core/interceptors/auth.interceptor'
import { AuthenticationEffects } from '@store/authentication/authentication.effects'

export const appConfig: ApplicationConfig = {
  providers: [
    DecimalPipe,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(rootReducer, { metaReducers: [localStorageSyncReducer] }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(CalendarEffects, AuthenticationEffects),
    importProvidersFrom(BrowserAnimationsModule, BrowserModule),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideToastr({}),
  ],
}

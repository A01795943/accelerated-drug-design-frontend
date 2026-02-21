import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { State } from './components/state/state';
import { Performance } from './components/performance/performance';
import { Conversions } from './components/conversions/conversions';
import { SessionsCountry } from './components/sessions-country/sessions-country';
import { TopPages } from './components/top-pages/top-pages';
import { RecentOrder } from './components/recent-order/recent-order';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    State,
    Performance,
    Conversions,
    SessionsCountry,
    TopPages,
    RecentOrder,
],
  templateUrl: './dashboard.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Dashboard {
  title = 'WELCOME!';
}

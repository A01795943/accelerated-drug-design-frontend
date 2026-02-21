import { Route } from '@angular/router'
import { Profile } from './profile/profile'
import { Permissions } from './permissions/permissions'
import { Review } from './review/review'
import { Faqs } from './faqs/faqs'
import { Starter } from './starter/starter'
import { Timeline } from './timeline/timeline'
import { Pricing } from './pricing/pricing'
import { Error404Alt } from './error-404-alt/error-404-alt'
import { Settings } from './settings/settings'
import { HelpCenter } from './help-center/help-center'
import { PrivacyPolicy } from './privacy-policy/privacy-policy'

export const PAGE_ROUTES: Route[] = [
  {
    path: 'profile',
    component: Profile,
    data: { title: 'Profile' },
  },
  {
    path: 'permissions',
    component: Permissions,
    data: { title: 'Permissions' },
  },
  {
    path: 'review',
    component: Review,
    data: { title: 'Reviews List' },
  },
  {
    path: 'faqs',
    component: Faqs,
    data: { title: 'FAQs' },
  },
  {
    path: 'starter',
    component: Starter,
    data: { title: 'Welcome' },
  },
  {
    path: 'timeline',
    component: Timeline,
    data: { title: 'Timeline' },
  },
  {
    path: 'pricing',
    component: Pricing,
    data: { title: 'Pricing' },
  },
  {
    path: '404-alt',
    component: Error404Alt,
    data: { title: '404' },
  },
  {
    path: 'settings',
    component: Settings,
    data: { title: 'Settings' },
  },
  {
    path: 'help-center',
    component: HelpCenter,
    data: { title: 'Help Center' },
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicy,
    data: { title: 'Privacy Policy' },
  }
]

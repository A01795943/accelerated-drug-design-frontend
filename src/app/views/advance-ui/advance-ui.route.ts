import { Route } from '@angular/router';
import { Ratings } from './ratings/ratings'
import { Sweetalert } from './sweetalert/sweetalert'
import { SwiperSilder } from './swiper-silder/swiper-silder'
import { Scrollbar } from './scrollbar/scrollbar'
import { Toastify } from './toastify/toastify'

export const ADVANCED_ROUTES: Route[] = [
  {
    path: 'ratings',
    component: Ratings,
    data: { title: 'Ratings' },
  },
  {
    path: 'sweetalert',
    component: Sweetalert,
    data: { title: 'Sweet Alert' },
  },
  {
    path: 'swiper-silder',
    component: SwiperSilder,
    data: { title: 'Swiper Silder' },
  },
  {
    path: 'scrollbar',
    component: Scrollbar,
    data: { title: 'Scrollbar' },
  },
  {
    path: 'toastify',
    component: Toastify,
    data: { title: 'Toastify' },
  },
];

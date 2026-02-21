import { Route } from '@angular/router';
import { Accordion } from './accordion/accordion'
import { Alert } from './alert/alert';
import { Avatars } from './avatars/avatars';
import { Badges } from './badges/badges';
import { Breadcrumb } from './breadcrumb/breadcrumb';
import { Buttons } from './buttons/buttons';
import { Card } from './card/card';
import { Carousel } from './carousel/carousel';
import { Collapse } from './collapse/collapse';
import { Dropdown } from './dropdown/dropdown';
import { ListGroup } from './list-group/list-group';
import { Modal } from './modal/modal';
import { Tabs } from './tabs/tabs';
import { Offcanvas } from './offcanvas/offcanvas';
import { Pagination } from './pagination/pagination'
import { Placeholders } from './placeholders/placeholders'
import { Popovers } from './popovers/popovers'
import { Progress } from './progress/progress'
import { Scrollspy } from './scrollspy/scrollspy'
import { Spinners } from './spinners/spinners'
import { Toasts } from './toasts/toasts'
import { Tooltips } from './tooltips/tooltips'

export const UI_ROUTES: Route[] = [
  {
    path: 'accordion',
    component: Accordion,
    data: { title: 'Accordions' },
  },
  {
    path: 'alerts',
    component: Alert,
    data: { title: 'Alerts' },
  },
  {
    path: 'avatar',
    component: Avatars,
    data: { title: 'Avatars' },
  },
  {
    path: 'badge',
    component: Badges,
    data: { title: 'Badges' },
  },
  {
    path: 'breadcrumb',
    component: Breadcrumb,
    data: { title: 'Breadcrumb' },
  },
  {
    path: 'buttons',
    component: Buttons,
    data: { title: 'Buttons' },
  },
  {
    path: 'carousel',
    component: Carousel,
    data: { title: 'Carousel' },
  },
  {
    path: 'card',
    component: Card,
    data: { title: 'Card' },
  },
  {
    path: 'collapse',
    component: Collapse,
    data: { title: 'Collapse' },
  },
  {
    path: 'dropdown',
    component: Dropdown,
    data: { title: 'Dropdown' },
  },
  {
    path: 'list-group',
    component: ListGroup,
    data: { title: 'List Group' },
  },
  {
    path: 'modal',
    component: Modal,
    data: { title: 'Modal' },
  },
  {
    path: 'tabs',
    component: Tabs,
    data: { title: 'Tabs' },
  },
  {
    path: 'offcanvas',
    component: Offcanvas,
    data: { title: 'Offcanvas' },
  },
  {
    path: 'pagination',
    component: Pagination,
    data: { title: 'Pagination' },
  },
  {
    path: 'placeholders',
    component: Placeholders,
    data: { title: 'Placeholder' },
  },
  {
    path: 'popovers',
    component: Popovers,
    data: { title: 'opovers' },
  },
  {
    path: 'progress',
    component: Progress,
    data: { title: 'Progress' },
  },
  {
    path: 'scrollspy',
    component: Scrollspy,
    data: { title: 'Scrollspy' },
  },
  {
    path: 'spinners',
    component: Spinners,
    data: { title: 'Spinners' },
  },
  {
    path: 'toasts',
    component: Toasts,
    data: { title: 'Toasts' },
  },
  {
    path: 'tooltips',
    component: Tooltips,
    data: { title: 'Tooltips' },
  }
];

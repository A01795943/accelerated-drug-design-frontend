import { Route } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';

export const VIEW_ROUTES: Route[] = [

  {
    path: 'index',
    component: Dashboard,
    data: { title: 'Dashboard' },
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./projects/projects.route').then((mod) => mod.PROJECTS_ROUTES),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./products/product.route').then((mod) => mod.PRODUCT_ROUTES),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./category/category.route').then((mod) => mod.CATEGORY_ROUTES),
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./inventory/inventory.route').then((mod) => mod.INVENTORY_ROUTES),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.route').then((mod) => mod.ORDER_ROUTES),
  },
  {
    path: 'purchase',
    loadChildren: () =>
      import('./purchase/purchase.route').then((mod) => mod.PURCHASE_ROUTES),
  },
  {
    path: 'attributes',
    loadChildren: () =>
      import('./attributes/attributes.route').then((mod) => mod.ATTRIBUTES_ROUTES),
  },
  {
    path: 'invoice',
    loadChildren: () =>
      import('./invoice/invoice.route').then((mod) => mod.INVOICE_ROUTES),
  },
  {
    path: 'role',
    loadChildren: () =>
      import('./roles/role.route').then((mod) => mod.ROLE_ROUTES),
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer/customer.route').then((mod) => mod.CUSTOMERS_ROUTES),
  },
  {
    path: 'seller',
    loadChildren: () =>
      import('./sellers/sellers.route').then((mod) => mod.SELLERS_ROUTES),
  },
  {
    path: 'coupons',
    loadChildren: () =>
      import('./coupons/coupons.route').then((mod) => mod.COUPON_ROUTES),
  },
  {
    path: 'apps',
    loadChildren: () =>
      import('./apps/apps.route').then((mod) => mod.APPS_ROUTES),
  },
  {
    path: 'ui',
    loadChildren: () =>
      import('./base-ui/ui.route').then((mod) => mod.UI_ROUTES),
  },
  {
    path: 'extended',
    loadChildren: () =>
      import('./advance-ui/advance-ui.route').then((mod) => mod.ADVANCED_ROUTES),
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('./charts/charts.route').then((mod) => mod.CHART_ROUTES),
  },
  {
    path: 'forms',
    loadChildren: () =>
      import('./forms/forms.route').then((mod) => mod.FORMS_ROUTES),
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./tables/tables.route').then((mod) => mod.TABLES_ROUTES),
  },
  {
    path: 'icons',
    loadChildren: () =>
      import('./icons/icons.route').then((mod) => mod.ICONS_ROUTES),
  },
  {
    path: 'maps',
    loadChildren: () =>
      import('./maps/maps.route').then((mod) => mod.MAPS_ROUTES),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.route').then((mod) => mod.PAGE_ROUTES),
  },
];

export type MenuItem = {
  key?: string
  label?: string
  icon?: string
  link?: string
  collapsed?: boolean
  subMenu?: any
  isTitle?: boolean
  badge?: any
  parentKey?: string
  disabled?: boolean
}

export const MENU: MenuItem[] = [
  {
    key: 'general',
    label: 'GENERAL',
    isTitle: true,
  },
  {
    key: 'dashboards',
    icon: 'solar:widget-5-bold-duotone',
    label: 'Dashboard',
    link:'/index'
  },
  {
    key: 'projects',
    icon: 'solar:folder-with-files-bold-duotone',
    label: 'Projects',
    collapsed: true,
    subMenu: [
      {
        key: 'projects-list',
        label: 'List',
        link: '/projects/list',
        parentKey: 'projects',
      },
      {
        key: 'projects-create',
        label: 'Create',
        link: '/projects/create',
        parentKey: 'projects',
      },
    ],
  },
  {
    key: 'products',
    icon: 'solar:t-shirt-bold-duotone',
    label: 'Products',
    collapsed: true,
    subMenu: [
      {
        key: 'products-list',
        label: 'List',
        link: '/product/list',
        parentKey: 'products',
      },
      {
        key: 'products-grid',
        label: 'Grid',
        link: '/product/grid',
        parentKey: 'products',
      },
      {
        key: 'products-details',
        label: 'Details',
        link: '/product/details',
        parentKey: 'products',
      },
      {
        key: 'products-edit',
        label: 'Edit',
        link: '/product/edit',
        parentKey: 'products',
      },
      {
        key: 'products-create',
        label: 'Create',
        link: '/product/add',
        parentKey: 'products',
      }
    ],
  },
  {
    key: 'category',
    icon: 'solar:clipboard-list-bold-duotone',
    label: 'Category',
    collapsed: true,
    subMenu: [
      {
        key: 'category-list',
        label: 'List',
        link: '/category/list',
        parentKey: 'category',
      },
      {
        key: 'category-edit',
        label: 'Edit',
        link: '/category/edit',
        parentKey: 'category',
      },
      {
        key: 'category-create',
        label: 'Create',
        link: '/category/add',
        parentKey: 'category',
      }
    ],
  },
  {
    key: 'inventory',
    icon: 'solar:box-bold-duotone',
    label: 'Inventory',
    collapsed: true,
    subMenu: [
      {
        key: 'inventory-warehouse',
        label: 'Warehouse',
        link: '/inventory/warehouse',
        parentKey: 'inventory',
      },
      {
        key: 'inventory-received-order',
        label: 'Received Order',
        link: '/inventory/received-order',
        parentKey: 'inventory',
      }
    ],
  },
  {
    key: 'orders',
    icon: 'solar:bag-smile-bold-duotone',
    label: 'Orders',
    collapsed: true,
    subMenu: [
      {
        key: 'orders-list',
        label: 'List',
        link: '/orders/list',
        parentKey: 'orders',
      },
      {
        key: 'orders-detail',
        label: 'Details',
        link: '/orders/detail',
        parentKey: 'orders',
      },
      {
        key: 'orders-cart',
        label: 'Cart',
        link: '/orders/cart',
        parentKey: 'orders',
      },
      {
        key: 'orders-checkout',
        label: 'Check Out',
        link: '/orders/checkout',
        parentKey: 'orders',
      },
    ],
  },
  {
    key: 'purchase',
    icon: 'solar:card-send-bold-duotone',
    label: 'Purchases',
    collapsed: true,
    subMenu: [
      {
        key: 'purchase-list',
        label: 'List',
        link: '/purchase/list',
        parentKey: 'purchase',
      },
      {
        key: 'purchase-order',
        label: 'Order',
        link: '/purchase/order',
        parentKey: 'purchase',
      },
      {
        key: 'orders-return',
        label: 'Return',
        link: '/purchase/returns',
        parentKey: 'purchase',
      }
    ],
  },
  {
    key: 'attributes',
    icon: 'solar:confetti-minimalistic-bold-duotone',
    label: 'Attributes',
    collapsed: true,
    subMenu: [
      {
        key: 'attributes-list',
        label: 'List',
        link: '/attributes/list',
        parentKey: 'attributes',
      },
      {
        key: 'attributes-edit',
        label: 'Edit',
        link: '/attributes/edit',
        parentKey: 'attributes',
      },
      {
        key: 'attributes-create',
        label: 'Create',
        link: '/attributes/add',
        parentKey: 'attributes',
      }
    ],
  },
  {
    key: 'invoice',
    icon: 'solar:bill-list-bold-duotone',
    label: 'Invoices',
    collapsed: true,
    subMenu: [
      {
        key: 'invoice-list',
        label: 'List',
        link: '/invoice/list',
        parentKey: 'invoice',
      },
      {
        key: 'invoice-details',
        label: 'Details',
        link: '/invoice/details',
        parentKey: 'invoice',
      },
      {
        key: 'invoice-create',
        label: 'Create',
        link: '/invoice/add',
        parentKey: 'invoice',
      }
    ],
  },
  {
    key: 'settings',
    icon: 'solar:settings-bold-duotone',
    label: 'Settings',
    link: '/pages/settings',
  },
  {
    key: 'users',
    label: 'Users',
    isTitle: true,
  },
  {
    key: 'profile',
    icon: 'solar:chat-square-like-bold-duotone',
    label: 'Profile',
    link: '/pages/profile',
  },
  {
    key: 'role',
    icon: 'solar:user-speak-rounded-bold-duotone',
    label: 'Roles',
    collapsed: true,
    subMenu: [
      {
        key: 'role-list',
        label: 'List',
        link: '/role/list',
        parentKey: 'role',
      },
      {
        key: 'role-edit',
        label: 'Edit',
        link: '/role/edit',
        parentKey: 'role',
      },
      {
        key: 'role-create',
        label: 'Create',
        link: '/role/add',
        parentKey: 'role',
      },
    ],
  },
  {
    key: 'permissions',
    icon: 'solar:checklist-minimalistic-bold-duotone',
    label: 'Permissions',
    link: '/pages/permissions',
  },
  {
    key: 'customer',
    icon: 'solar:users-group-two-rounded-bold-duotone',
    label: 'Customers',
    collapsed: true,
    subMenu: [
      {
        key: 'customer-list',
        label: 'List',
        link: '/customer/list',
        parentKey: 'customer',
      },
      {
        key: 'customer-details',
        label: 'Details',
        link: '/customer/detail',
        parentKey: 'customer',
      }
    ],
  },
  {
    key: 'seller',
    icon: 'solar:shop-bold-duotone',
    label: 'Sellers',
    collapsed: true,
    subMenu: [
      {
        key: 'seller-list',
        label: 'List',
        link: '/seller/list',
        parentKey: 'seller',
      },
      {
        key: 'seller-details',
        label: 'Details',
        link: '/seller/details',
        parentKey: 'seller',
      },
      {
        key: 'seller-edit',
        label: 'Edit',
        link: '/seller/edit',
        parentKey: 'seller',
      },
      {
        key: 'seller-create',
        label: 'Create',
        link: '/seller/add',
        parentKey: 'seller',
      }
    ],
  },
  {
    key: 'other',
    label: 'Other',
    isTitle: true,
  },
  {
    key: 'coupons',
    icon: 'solar:leaf-bold-duotone',
    label: 'Coupons',
    collapsed: true,
    subMenu: [
      {
        key: 'coupons-list',
        label: 'List',
        link: '/coupons/list',
        parentKey: 'coupons',
      },
      {
        key: 'coupons-add',
        label: 'Add',
        link: '/coupons/add',
        parentKey: 'coupons',
      }
    ],
  },
  {
    key: 'review',
    icon: 'solar:chat-square-like-bold-duotone',
    label: 'Reviews',
    link: '/pages/review',
  },
  {
    key: 'other-apps',
    label: 'Other Apps',
    isTitle: true,
  },
  {
    key: 'chat',
    icon: 'solar:chat-round-bold-duotone',
    label: 'Chat',
    link: '/apps/chat',
  },
  {
    key: 'email',
    icon: 'solar:mailbox-bold-duotone',
    label: 'Email',
    link: '/apps/email',
  },
  {
    key: 'calendar',
    icon: 'solar:calendar-bold-duotone',
    label: 'Calendar',
    link: '/apps/calendar',
  },
  {
    key: 'todo',
    icon: 'solar:checklist-bold-duotone',
    label: 'Todo',
    link: '/apps/todo',
  },
  {
    key: 'support',
    label: 'Support',
    isTitle: true,
  },
  {
    key: 'help-center',
    icon: 'solar:help-bold-duotone',
    label: 'Help Center',
    link: '/pages/help-center',
  },
  {
    key: 'faqs',
    icon: 'solar:question-circle-bold-duotone',
    label: 'FAQs',
    link: '/pages/faqs',
  },
  {
    key: 'privacy-policy',
    icon: 'solar:document-text-bold-duotone',
    label: 'Privacy Policy',
    link: '/pages/privacy-policy',
  },
  {
    key: 'custom',
    label: 'Custom',
    isTitle: true,
  },
  {
    key: 'pages',
    label: 'Pages',
    isTitle: false,
    icon: 'solar:gift-bold-duotone',
    collapsed: true,
    subMenu: [
      {
        key: 'page-welcome',
        label: 'Welcome',
        link: '/pages/starter',
        parentKey: 'pages',
      },
      {
        key: 'page-comingsoon',
        label: 'Coming Soon',
        link: '/pages/comingsoon',
        parentKey: 'pages',
      },
      {
        key: 'page-timeline',
        label: 'Timeline',
        link: '/pages/timeline',
        parentKey: 'pages',
      },
      {
        key: 'page-pricing',
        label: 'Pricing',
        link: '/pages/pricing',
        parentKey: 'pages',
      },
      {
        key: 'page-maintenance',
        label: 'Maintenance',
        link: '/pages/maintenance',
        parentKey: 'pages',
      },
      {
        key: 'page-404-error',
        label: '404 Error',
        link: '/pages/404',
        parentKey: 'pages',
      },
      {
        key: 'page-error-404-alt',
        label: '404 Error (alt)',
        link: '/pages/404-alt',
        parentKey: 'pages',
      }
    ],
  },
  {
    key: 'authentication',
    label: 'Authentication',
    isTitle: false,
    icon: 'solar:lock-keyhole-bold-duotone',
    collapsed: true,
    subMenu: [
      {
        key: 'sign-in',
        label: 'Sign In',
        link: '/auth/signin',
        parentKey: 'authentication',
      },
      {
        key: 'signup',
        label: 'Sign Up',
        link: '/auth/signup',
        parentKey: 'authentication',
      },
      {
        key: 'reset-pass',
        label: 'Reset Password',
        link: '/auth/password',
        parentKey: 'authentication',
      },
      {
        key: 'lock-screen',
        label: 'Lock Screen',
        link: '/auth/lock-screen',
        parentKey: 'authentication',
      }
    ],
  },
  {
    key: 'widgets',
    icon: 'solar:atom-bold-duotone',
    label: 'Widgets',
    link: '/apps/widgets',
    badge: {
      variant: 'info',
      text: '9+',
    },
  },
  {
    key: 'components',
    label: 'COMPONENTS',
    isTitle: true,
  },
  {
    key: 'base-ui',
    icon: 'solar:bookmark-square-bold-duotone',
    label: 'Base UI',
    collapsed: true,
    subMenu: [
      {
        key: 'base-ui-accordion',
        label: 'Accordion',
        link: '/ui/accordion',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-alerts',
        label: 'Alerts',
        link: '/ui/alerts',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-avatar',
        label: 'Avatar',
        link: '/ui/avatar',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-badge',
        label: 'Badge',
        link: '/ui/badge',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-breadcrumb',
        label: 'Breadcrumb',
        link: '/ui/breadcrumb',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-buttons',
        label: 'Buttons',
        link: '/ui/buttons',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-card',
        label: 'Card',
        link: '/ui/card',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-carousel',
        label: 'Carousel',
        link: '/ui/carousel',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-collapse',
        label: 'Collapse',
        link: '/ui/collapse',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-dropdown',
        label: 'Dropdown',
        link: '/ui/dropdown',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-list-group',
        label: 'List Group',
        link: '/ui/list-group',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-modal',
        label: 'Modal',
        link: '/ui/modal',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-tabs',
        label: 'Tabs',
        link: '/ui/tabs',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-offcanvas',
        label: 'Offcanvas',
        link: '/ui/offcanvas',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-pagination',
        label: 'Pagination',
        link: '/ui/pagination',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-placeholders',
        label: 'Placeholders',
        link: '/ui/placeholders',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-popovers',
        label: 'Popovers',
        link: '/ui/popovers',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-progress',
        label: 'Progress',
        link: '/ui/progress',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-scrollspy',
        label: 'Scrollspy',
        link: '/ui/scrollspy',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-spinners',
        label: 'Spinners',
        link: '/ui/spinners',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-toasts',
        label: 'Toasts',
        link: '/ui/toasts',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-tooltips',
        label: 'Tooltips',
        link: '/ui/tooltips',
        parentKey: 'base-ui',
      },
    ],
  },
  {
    key: 'advanced-ui',
    icon: 'solar:case-round-bold-duotone',
    label: 'Advanced UI',
    collapsed: true,
    subMenu: [
      {
        key: 'advanced-ui-ratings',
        label: 'Ratings',
        link: '/extended/ratings',
        parentKey: 'advanced-ui',
      },
      {
        key: 'advanced-ui-sweet-alert',
        label: 'Sweet Alert',
        link: '/extended/sweetalert',
        parentKey: 'advanced-ui',
      },
      {
        key: 'advanced-ui-swiper-slider',
        label: 'Swiper Slider',
        link: '/extended/swiper-silder',
        parentKey: 'advanced-ui',
      },
      {
        key: 'advanced-ui-scrollbar',
        label: 'Scrollbar',
        link: '/extended/scrollbar',
        parentKey: 'advanced-ui',
      },
      {
        key: 'advanced-ui-toastify',
        label: 'Toastify',
        link: '/extended/toastify',
        parentKey: 'advanced-ui',
      },
    ],
  },
  {
    key: 'charts',
    icon: 'solar:pie-chart-2-bold-duotone',
    label: 'Charts',
    collapsed: true,
    subMenu: [
      {
        key: 'charts-area',
        label: 'Area',
        link: '/charts/area',
        parentKey: 'charts',
      },
      {
        key: 'charts-bar',
        label: 'Bar',
        link: '/charts/bar',
        parentKey: 'charts',
      },
      {
        key: 'charts-bubble',
        label: 'Bubble',
        link: '/charts/bubble',
        parentKey: 'charts',
      },
      {
        key: 'charts-candl-stick',
        label: 'Candlestick',
        link: '/charts/candlestick',
        parentKey: 'charts',
      },
      {
        key: 'charts-column',
        label: 'Column',
        link: '/charts/column',
        parentKey: 'charts',
      },
      {
        key: 'charts-heatmap',
        label: 'Heatmap',
        link: '/charts/heatmap',
        parentKey: 'charts',
      },
      {
        key: 'charts-line',
        label: 'Line',
        link: '/charts/line',
        parentKey: 'charts',
      },
      {
        key: 'charts-mixed',
        label: 'Mixed',
        link: '/charts/mixed',
        parentKey: 'charts',
      },
      {
        key: 'charts-timeline',
        label: 'Timeline',
        link: '/charts/timeline',
        parentKey: 'charts',
      },
      {
        key: 'charts-boxplot',
        label: 'Boxplot',
        link: '/charts/boxplot',
        parentKey: 'charts',
      },
      {
        key: 'charts-treemap',
        label: 'Treemap',
        link: '/charts/treemap',
        parentKey: 'charts',
      },
      {
        key: 'charts-pie',
        label: 'Pie',
        link: '/charts/pie',
        parentKey: 'charts',
      },
      {
        key: 'charts-radar',
        label: 'Radar',
        link: '/charts/radar',
        parentKey: 'charts',
      },
      {
        key: 'charts-radialbar',
        label: 'RadialBar',
        link: '/charts/radialbar',
        parentKey: 'charts',
      },
      {
        key: 'charts-scatter',
        label: 'Scatter',
        link: '/charts/scatter',
        parentKey: 'charts',
      },
      {
        key: 'charts-polar-area',
        label: 'Polar Area',
        link: '/charts/polar-area',
        parentKey: 'charts',
      },
    ],
  },
  {
    key: 'forms',
    icon: 'solar:book-bookmark-bold-duotone',
    label: 'Forms',
    collapsed: true,
    subMenu: [
      {
        key: 'forms-basic-elements',
        label: 'Basic Elements',
        link: '/forms/basic',
        parentKey: 'forms',
      },
      {
        key: 'forms-checkbox&radio',
        label: 'Checkbox & Radio',
        link: '/forms/checkbox-radio',
        parentKey: 'forms',
      },
      {
        key: 'forms-choice-select',
        label: 'Choice Select',
        link: '/forms/choices',
        parentKey: 'forms',
      },
      {
        key: 'forms-clipboard',
        label: 'Clipboard',
        link: '/forms/clipboard',
        parentKey: 'forms',
      },
      {
        key: 'forms-flat-picker',
        label: 'Flatpicker',
        link: '/forms/flatepicker',
        parentKey: 'forms',
      },
      {
        key: 'forms-validation',
        label: 'Validation',
        link: '/forms/validation',
        parentKey: 'forms',
      },
      {
        key: 'forms-wizard',
        label: 'Wizard',
        link: '/forms/wizard',
        parentKey: 'forms',
      },
      {
        key: 'forms-file-uploads',
        label: 'File Upload',
        link: '/forms/fileuploads',
        parentKey: 'forms',
      },
      {
        key: 'forms-editors',
        label: 'Editors',
        link: '/forms/editors',
        parentKey: 'forms',
      },
      {
        key: 'forms-input-mask',
        label: 'Input Mask',
        link: '/forms/input-mask',
        parentKey: 'forms',
      },
      {
        key: 'forms-slider',
        label: 'Slider',
        link: '/forms/range-slider',
        parentKey: 'forms',
      },
    ],
  },
  {
    key: 'tables',
    icon: 'solar:tuning-2-bold-duotone',
    label: 'Tables',
    collapsed: true,
    subMenu: [
      {
        key: 'tables-basic',
        label: 'Basic Tables',
        link: '/tables/basic',
        parentKey: 'tables',
      },
      {
        key: 'tables-datatable',
        label: 'Datatables',
        link: '/tables/datatable',
        parentKey: 'tables',
      },
    ],
  },
  {
    key: 'icons',
    icon: 'solar:ufo-2-bold-duotone',
    label: 'Icons',
    collapsed: true,
    subMenu: [
      {
        key: 'icons-boxicons',
        label: 'Boxicons',
        link: '/icons/boxicons',
        parentKey: 'icons',
      },
      {
        key: 'icons-solar',
        label: 'Solar Icons',
        link: '/icons/solar',
        parentKey: 'icons',
      },
    ],
  },
  {
    key: 'maps',
    icon: 'solar:streets-map-point-bold-duotone',
    label: 'Maps',
    collapsed: true,
    subMenu: [
      {
        key: 'maps-google',
        label: 'Google Maps',
        link: '/maps/google',
        parentKey: 'maps',
      },
      {
        key: 'maps-vector',
        label: 'Vector Maps',
        link: '/maps/vector',
        parentKey: 'maps',
      },
    ],
  },
  {
    key: 'badge-menu',
    icon: 'solar:volleyball-bold-duotone',
    label: 'Badge Menu',
    badge: {
      variant: 'danger',
      text: '1',
    },
  },
  {
    key: 'menuitem',
    icon: 'solar:share-circle-bold-duotone',
    label: 'Menu Item',
    collapsed: true,
    subMenu: [
      {
        key: 'menu-item-1',
        label: 'Menu Item 1',
        parentKey: 'menuitem',
      },
      {
        key: 'menu-item-2',
        label: 'Menu Item 2',
        collapsed: true,
        parentKey: 'menuitem',
        subMenu: [
          {
            key: 'menu-sub-item',
            label: 'Menu Sub Item',
            parentKey: 'menu-item-2',
          },
        ],
      },
    ],
  },
  {
    key: 'disabled-item',
    icon: 'solar:user-block-rounded-bold-duotone',
    label: 'Disable Item',
    disabled: true,
  },
]

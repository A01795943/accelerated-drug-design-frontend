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
  /** Si está definido, solo se muestra para estos roles (ej. ['admin']) */
  roles?: string[]
}

export const MENU: MenuItem[] = [
  {
    key: 'projects',
    icon: 'solar:folder-with-files-bold-duotone',
    label: 'Proyectos',
    collapsed: false,
    subMenu: [
      {
        key: 'projects-list',
        label: 'Lista',
        link: '/projects/list',
        parentKey: 'projects',
      },
      {
        key: 'projects-create',
        label: 'Crear',
        link: '/projects/create',
        parentKey: 'projects',
      },
    ],
  },
  {
    key: 'users',
    icon: 'solar:users-group-rounded-bold-duotone',
    label: 'Usuarios',
    collapsed: true,
    link: '/users/list',
    subMenu: [
      {
        key: 'users-list',
        label: 'Lista',
        link: '/users/list',
        parentKey: 'users',
      },
    ],
    roles: ['admin'],
  },
]

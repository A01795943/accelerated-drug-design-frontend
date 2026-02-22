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
]

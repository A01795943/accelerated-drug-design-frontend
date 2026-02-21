import { Route } from '@angular/router'
import { RoleList } from './role-list/role-list'
import { RoleEdit } from './role-edit/role-edit'
import { RoleAdd } from './role-add/role-add'

export const ROLE_ROUTES: Route[] = [
  {
    path: 'list',
    component: RoleList,
    data: { title: 'Roles List' },
  },
  {
    path: 'edit',
    component: RoleEdit,
    data: { title: 'Role Edit' },
  },
  {
    path: 'add',
    component: RoleAdd,
    data: { title: 'Role Add' },
  }
]

import { Route } from '@angular/router'
import { CategoryList } from './category-list/category-list'
import { CategoryEdit } from './category-edit/category-edit'
import { CategoryAdd } from './category-add/category-add'

export const CATEGORY_ROUTES: Route[] = [
  {
    path: 'list',
    component: CategoryList,
    data: { title: 'Categories List' },
  },
  {
    path: 'edit',
    component: CategoryEdit,
    data: { title: 'Category Edit' },
  },
  {
    path: 'add',
    component: CategoryAdd,
    data: { title: 'Create Category' },
  },
]

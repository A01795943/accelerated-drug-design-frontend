import { Route } from '@angular/router'
import { AttributesList } from './attributes-list/attributes-list'
import { AttributesEdit } from './attributes-edit/attributes-edit'
import { AttributesAdd } from './attributes-add/attributes-add'

export const ATTRIBUTES_ROUTES: Route[] = [
  {
    path: 'list',
    component: AttributesList,
    data: { title: 'Attribute List' },
  },
  {
    path: 'edit',
    component: AttributesEdit,
    data: { title: 'Attribute Edit' },
  },
  {
    path: 'add',
    component: AttributesAdd,
    data: { title: 'Attribute Add' },
  }
]

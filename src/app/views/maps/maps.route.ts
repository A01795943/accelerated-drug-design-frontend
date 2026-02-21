import { Route } from '@angular/router'
import { Google } from './google/google'
import { Vector } from './vector/vector'

export const MAPS_ROUTES: Route[] = [
  {
    path: 'google',
    component: Google,
    data: { title: 'Google Maps' },
  },
  {
    path: 'vector',
    component: Vector,
    data: { title: 'Vector Maps' },
  }
]
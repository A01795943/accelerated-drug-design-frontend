import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { permissionState } from '../../data'
import { StateCard } from '@component/state-card/state-card'

@Component({
  selector: 'permission-state',
  standalone: true,
  imports: [StateCard],
  templateUrl: './permission-state.html',
})
export class PermissionState {
  stateList = permissionState
}

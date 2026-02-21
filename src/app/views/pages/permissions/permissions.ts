import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PermissionState } from './components/permission-state/permission-state';
import { permissionData } from './data';
import { CommonModule } from '@angular/common'
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [PermissionState,CommonModule,NgbPaginationModule,NgbDropdownModule],
  templateUrl: './permissions.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Permissions {
  title = 'Permissions';
  permissionList = permissionData;
}

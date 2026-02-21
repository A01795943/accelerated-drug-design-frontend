import { Component, inject } from '@angular/core'
import { EmailList } from '../email-list/email-list'
import {
  NgbDropdownModule,
  NgbOffcanvas,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import { Compose } from '../compose/compose'

@Component({
  selector: 'email-topbar',
  standalone: true,
  imports: [EmailList, NgbDropdownModule, NgbTooltipModule],
  templateUrl: './email-topbar.html',
  styles: ``,
})
export class EmailTopbar {
  private offcanvasService = inject(NgbOffcanvas)
  openSidebar() {
    this.offcanvasService.open(Compose)
  }
}

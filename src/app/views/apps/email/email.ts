import { Component } from '@angular/core';
import { EmailTopbar } from './components/email-topbar/email-topbar'
import { Compose } from './components/compose/compose'

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [Compose, EmailTopbar],
  templateUrl: './email.html',
  styles: ``
})
export class Email {
  title="Inbox"
}

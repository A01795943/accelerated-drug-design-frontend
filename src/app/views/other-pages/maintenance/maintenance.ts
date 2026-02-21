import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'
import { LogoBox } from '@component/logo-box'

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [LogoBox,RouterLink],
  templateUrl: './maintenance.html',
  styles: ``
})
export class Maintenance {

}

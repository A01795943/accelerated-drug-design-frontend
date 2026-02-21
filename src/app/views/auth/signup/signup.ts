import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'
import { LogoBox } from '@component/logo-box'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [LogoBox,RouterLink],
  templateUrl: './signup.html',
  styles: ``
})
export class Signup {

}

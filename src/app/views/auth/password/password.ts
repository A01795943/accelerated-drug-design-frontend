import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'
import { LogoBox } from '@component/logo-box'

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [RouterLink,LogoBox],
  templateUrl: './password.html',
  styles: ``
})
export class Password {

}

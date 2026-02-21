import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'
import { LogoBox } from '@component/logo-box'

@Component({
  selector: 'app-error-404',
  standalone: true,
  imports: [RouterLink,LogoBox],
  templateUrl: './error-404.html',
  styles: ``
})
export class Error404 {

}

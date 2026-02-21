import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoBox } from '@component/logo-box';

@Component({
  selector: 'app-lock-screen',
  standalone: true,
  imports: [LogoBox, RouterLink],
  templateUrl: './lock-screen.html',
  styles: ``,
})
export class LockScreen {}

import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-logo-box',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div [class]="className">
      <a routerLink="/" class="logo-dark">
        @if (size) {
          <img [src]="logoUrl" class="logo-sm" alt="logo sm" />
          <img [src]="logoUrl" class="logo-lg" alt="logo dark" />
        } @else {
          <img [src]="logoUrl" height="24" alt="logo dark" />
        }
      </a>

      <a routerLink="/" class="logo-light">
        @if (size) {
          <img [src]="logoUrl" class="logo-sm" alt="logo sm" />
          <img [src]="logoUrl" class="logo-lg" alt="logo light" />
        } @else {
          <img [src]="logoUrl" height="24" alt="logo light" />
        }
      </a>
    </div>
  `,
})
export class LogoBox {
  @Input() className: string = ''
  @Input() size: boolean = false

  /** Logo image URL (Tec de Monterrey – sidebar and auth). */
  logoUrl =
    'https://cdn-3.expansion.mx/dims4/default/2fdd57d/2147483647/strip/true/crop/362x217+0+0/resize/1200x719!/format/webp/quality/60/?url=https%3A%2F%2Fcherry-brightspot.s3.amazonaws.com%2Fmedia%2F2014%2F08%2F15%2Ftec-de-monterrey.jpg'
}

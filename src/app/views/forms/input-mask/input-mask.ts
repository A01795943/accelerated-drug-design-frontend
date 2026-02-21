import { Component } from '@angular/core';
import { NgxMaskDirective,provideNgxMask } from 'ngx-mask'

@Component({
  selector: 'app-input-mask',
  standalone: true,
  imports: [NgxMaskDirective],
  templateUrl: './input-mask.html',
  styles: ``,
  providers: [provideNgxMask()],
})
export class InputMask {
title="Input Mask"
}

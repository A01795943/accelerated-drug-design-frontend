import { Component } from '@angular/core';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'order-progress',
  standalone: true,
  imports: [NgbProgressbarModule],
  templateUrl: './order-progress.html',
  styles: ``,
})
export class OrderProgress {}

import { Component } from '@angular/core';
import { currency } from '@common/constants';

@Component({
  selector: 'add-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail {
  currency=currency
}

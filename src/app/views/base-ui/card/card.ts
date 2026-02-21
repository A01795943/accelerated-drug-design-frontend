import { Component } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.html',
  styles: ``
})
export class Card {
  title = "Cards"
}

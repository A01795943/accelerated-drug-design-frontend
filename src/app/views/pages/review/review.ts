import { Component } from '@angular/core';
import { ReviewData } from './data';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './review.html',
  styles: ``,
})
export class Review {
  title = 'Reviews List';
  reviewList = ReviewData;
}

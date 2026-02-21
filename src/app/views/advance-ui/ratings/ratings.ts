import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [NgbRatingModule,ReactiveFormsModule, UIExamplesList],
  templateUrl: './ratings.html',
  styles: ``
})
export class Ratings {
  title = "Ratings"
  basicRating = 5
  rating = 3
  stepRating = 0
  readonly=3.5
  hovered = 0
  hoverSelected = 1
  
  ctrl = new FormControl<number | null>(null, Validators.required)
}

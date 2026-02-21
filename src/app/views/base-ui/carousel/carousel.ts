import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';
import { NgbCarouselModule, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [UIExamplesList, NgbCarouselModule,FormsModule],
  templateUrl: './carousel.html',
  styles: ``
})
export class Carousel {
  title = "Carousel"



  constructor(config: NgbCarouselConfig) {
    config.showNavigationArrows = true
    config.showNavigationIndicators = true
  }
}

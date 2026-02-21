import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { credits, currentYear } from '@common/constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Footer {
  year = currentYear;
  credits = credits;
}

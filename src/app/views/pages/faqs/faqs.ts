import { Component } from '@angular/core';
import { FaqData } from './data'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './faqs.html',
  styles: ``,
})
export class Faqs {
  title = 'FAQs';
  faqList = FaqData
}

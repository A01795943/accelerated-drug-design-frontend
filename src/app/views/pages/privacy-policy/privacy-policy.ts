import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrivacyPolicy {
  title = 'Privacy Policy';
}

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PersonalInfo } from './components/personal-info/personal-info'
import { About } from './components/about/about'
import { Reviews } from './components/reviews/reviews'
import { Achievement } from './components/achivement/achivement'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [PersonalInfo,About,Reviews,Achievement,NgbDropdownModule],
  templateUrl: './profile.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Profile {
  title = 'Profile';
}

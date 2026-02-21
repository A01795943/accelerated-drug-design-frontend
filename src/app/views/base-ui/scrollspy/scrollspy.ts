import { Component } from '@angular/core';
import { NgbDropdownModule, NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-scrollspy',
  standalone: true,
  imports: [NgbScrollSpyModule,NgbDropdownModule],
  templateUrl: './scrollspy.html',
  styles: ``
})
export class Scrollspy {
title="Scrollspy"
}

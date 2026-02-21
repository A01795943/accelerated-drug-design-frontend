import { Component } from '@angular/core'
import { RecentProjectData } from '../../data'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'
import { SimplebarAngularModule } from 'simplebar-angular'

@Component({
  selector: 'widget-recent-project',
  standalone: true,
  imports: [NgbProgressbarModule, SimplebarAngularModule],
  templateUrl: './recent-project.html',
  styles: ``,
})
export class RecentProject {
  projectsList = RecentProjectData
}

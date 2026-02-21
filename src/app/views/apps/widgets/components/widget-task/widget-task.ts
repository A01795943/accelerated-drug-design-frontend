import { Component } from '@angular/core'
import { SimplebarAngularModule } from 'simplebar-angular'
import { TodoData } from '../../../todo/data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'widget-task',
  standalone: true,
  imports: [SimplebarAngularModule, CommonModule],
  templateUrl: './widget-task.html',
  styles: ``,
})
export class WidgetTask {
  taskList = TodoData
}

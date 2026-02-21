import { Component } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { alert, type AlertType } from './data';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgbAlertModule,UIExamplesList],
  templateUrl: './alert.html',
  styles: ``
})
export class Alert {
  title="Alert"
  alertData: AlertType[] = alert

  close(index: number) {
    this.alertData.splice(index, 1)
  }
}

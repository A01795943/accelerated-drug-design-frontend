import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, type TemplateRef } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';
import { ToastService } from '@core/services/toast-service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from "./toasts-container";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toastss',
  standalone: true,
  imports: [NgbToastModule, UIExamplesList, ToastsContainer,FormsModule],
  templateUrl: './toasts.html',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  styles: ``
})
export class Toasts {
  title = "Toast"
  liveToast = false
  show = true
  show1 = true
  show2 = true
  show3 = true
  placement = true
  translucent = true
  toastPlacement: string = ''
  toastService = inject(ToastService);

  showStandard() {
    this.toastService.show({
      content: "See? Just like this.",
      delay: 10000,
      classname: 'standard',
    })
  }

  showStandard2() {
    this.toastService.show({
      content: 'Heads up, toasts will stack automatically',
      delay: 10000,
      classname: 'standard',
    })
  }

  close() {
    this.show = false
  }
}

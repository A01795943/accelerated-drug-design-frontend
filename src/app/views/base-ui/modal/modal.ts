import { Component, inject, type TemplateRef } from '@angular/core';
import { UIExamplesList } from '@component/ui-examples-list/ui-examples-list';
import { NgbModal, NgbModalModule, type NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [UIExamplesList,NgbModalModule],
  templateUrl: './modal.html',
  styles: ``,
  providers: [NgbModal],
})
export class Modal {
  title = "Modal"
  private modalService = inject(NgbModal)

  open(content: TemplateRef<any>) {
    this.modalService.open(content)
  }

  staticBackdrop(content: TemplateRef<any>) {
    this.modalService.open(content)
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions) {
    this.modalService.open(content, options)
  }
}

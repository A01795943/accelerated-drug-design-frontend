import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService, type Backbone } from '@core/services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-generation-job-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-generation-job-modal.html',
  styles: ``,
})
export class AddGenerationJobModal {
  projectId!: number;
  /** Completed backbones for the select (parent passes these). */
  completedBackbones: Backbone[] = [];

  private fb = inject(FormBuilder);
  private activeModal = inject(NgbActiveModal);
  private projectService = inject(ProjectService);
  private toastr = inject(ToastrService);

  form: FormGroup;
  submitting = false;

  constructor() {
    this.form = this.fb.group({
      backboneId: [null as number | null],
      temperature: [0.1],
      numSeqs: [16],
    });
  }

  create(): void {
    if (this.submitting) return;
    const v = this.form.value;
    const backboneId = v.backboneId != null ? Number(v.backboneId) : null;
    if (backboneId == null) {
      this.toastr.warning('Please select a backbone.');
      return;
    }
    const temperature = Math.min(1, Math.max(0, Number(v.temperature) ?? 0.1));
    const numSeqs = Math.max(1, Number(v.numSeqs) || 16);
    this.submitting = true;
    this.projectService
      .createGenerationJob(this.projectId, {
        backboneId,
        temperature,
        numSeqs,
      })
      .subscribe({
        next: () => {
          this.toastr.success('Job created.');
          this.activeModal.close(true);
        },
        error: (err) => {
          this.submitting = false;
          this.toastr.error(err?.error?.message || err?.message || 'Failed to create job.');
        },
      });
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}

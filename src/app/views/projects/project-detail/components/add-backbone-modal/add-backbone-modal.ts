import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '@core/services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-backbone-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-backbone-modal.html',
  styles: ``,
})
export class AddBackboneModal {
  /** Set by the parent when opening the modal. */
  projectId!: number;
  private fb = inject(FormBuilder);
  private activeModal = inject(NgbActiveModal);
  private projectService = inject(ProjectService);
  private toastr = inject(ToastrService);

  form: FormGroup;
  submitting = false;
  generating: { contigs: boolean; hotspots: boolean; chainsToRemove: boolean } = {
    contigs: false,
    hotspots: false,
    chainsToRemove: false,
  };

  constructor() {
    this.form = this.fb.group({
      contigs: [''],
      hotspots: [''],
      chainsToRemove: [''],
      count: [1],
      iterations: [30],
    });
  }

  generateContigs(): void {
    this.generating.contigs = true;
    this.projectService.generateContigs().subscribe({
      next: (value) => this.form.patchValue({ contigs: value }),
      error: () => this.toastr.error('Failed to generate contigs'),
      complete: () => (this.generating.contigs = false),
    });
  }

  generateHotspots(): void {
    this.generating.hotspots = true;
    this.projectService.generateHotspots().subscribe({
      next: (value) => this.form.patchValue({ hotspots: value }),
      error: () => this.toastr.error('Failed to generate hotspots'),
      complete: () => (this.generating.hotspots = false),
    });
  }

  generateChainsToRemove(): void {
    this.generating.chainsToRemove = true;
    this.projectService.generateChainsToRemove().subscribe({
      next: (value) => this.form.patchValue({ chainsToRemove: value }),
      error: () => this.toastr.error('Failed to generate chains to remove'),
      complete: () => (this.generating.chainsToRemove = false),
    });
  }

  create(): void {
    if (this.submitting) return;
    const v = this.form.value;
    const count = Math.max(1, Number(v.count) || 1);
    const iterations = Math.max(1, Number(v.iterations) || 30);
    this.submitting = true;
    this.projectService
      .createBackbones(this.projectId, {
        contigs: v.contigs?.trim() || undefined,
        hotspots: v.hotspots?.trim() || undefined,
        chainsToRemove: v.chainsToRemove?.trim() || undefined,
        count,
        iterations,
      })
      .subscribe({
        next: () => {
          this.toastr.success('Backbone(s) created.');
          this.activeModal.close(true);
        },
        error: (err) => {
          this.submitting = false;
          this.toastr.error(err?.error?.message || err?.message || 'Failed to create backbone(s).');
        },
      });
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}

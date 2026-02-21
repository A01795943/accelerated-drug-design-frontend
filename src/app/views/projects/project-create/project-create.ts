import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService, type CreateProjectRequest } from '@core/services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-create.html',
  styles: ``,
})
export class ProjectCreate {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  title = 'Create Project';
  form: FormGroup;
  submitting = false;

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: [''],
      targetDownloadFromWeb: [true],
      targetName: [''],
      target: [''],
      complexDownloadFromWeb: [true],
      complexName: [''],
      complex: [''],
    });
  }

  onSubmit(): void {
    if (this.form.invalid || this.submitting) return;

    const v = this.form.value;
    const payload: CreateProjectRequest = {
      name: (v.name || '').trim(),
      description: (v.description || '').trim() || undefined,
      targetDownloadFromWeb: !!v.targetDownloadFromWeb,
      targetName: v.targetDownloadFromWeb ? (v.targetName || '').trim() || undefined : undefined,
      target: !v.targetDownloadFromWeb ? (v.target || '').trim() || undefined : undefined,
      complexDownloadFromWeb: !!v.complexDownloadFromWeb,
      complexName: v.complexDownloadFromWeb ? (v.complexName || '').trim() || undefined : undefined,
      complex: !v.complexDownloadFromWeb ? (v.complex || '').trim() || undefined : undefined,
    };

    if (!payload.name) {
      this.toastr.warning('Project name is required.');
      return;
    }

    this.submitting = true;
    this.projectService.createProject(payload).subscribe({
      next: (created) => {
        this.toastr.success('Project created successfully.');
        this.router.navigate(['/projects/detail', created.id]);
      },
      error: (err) => {
        this.submitting = false;
        const msg = err?.error?.message || err?.message || 'Failed to create project.';
        this.toastr.error(msg);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/projects/list']);
  }
}

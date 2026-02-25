import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '@/app/core/services/auth.service';

@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Cambiar contraseña</h5>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss()"></button>
    </div>
    <div class="modal-body">
      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="mb-3">
          <label class="form-label" for="currentPassword">Contraseña actual</label>
          <input type="password" class="form-control" id="currentPassword" formControlName="currentPassword" placeholder="Contraseña actual" />
          @if (form.get('currentPassword')?.invalid && form.get('currentPassword')?.touched) {
            <div class="text-danger small">Requerido</div>
          }
        </div>
        <div class="mb-3">
          <label class="form-label" for="newPassword">Contraseña nueva</label>
          <input type="password" class="form-control" id="newPassword" formControlName="newPassword" placeholder="Contraseña nueva" />
          @if (form.get('newPassword')?.invalid && form.get('newPassword')?.touched) {
            <div class="text-danger small">Mínimo 4 caracteres</div>
          }
        </div>
        <div class="mb-3">
          <label class="form-label" for="confirmPassword">Confirmar contraseña nueva</label>
          <input type="password" class="form-control" id="confirmPassword" formControlName="confirmPassword" placeholder="Confirmar contraseña" />
          @if (form.get('confirmPassword')?.touched && form.hasError('mismatch')) {
            <div class="text-danger small">Las contraseñas no coinciden</div>
          }
        </div>
        @if (errorMessage) {
          <div class="alert alert-danger py-2">{{ errorMessage }}</div>
        }
        <div class="modal-footer border-0 px-0 pb-0">
          <button type="button" class="btn btn-soft-secondary" (click)="activeModal.dismiss()">Cancelar</button>
          <button type="submit" class="btn btn-soft-primary" [disabled]="form.invalid || loading">
            {{ loading ? 'Guardando...' : 'Guardar' }}
          </button>
        </div>
      </form>
    </div>
  `,
})
export class ChangePasswordModal {
  activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  private auth = inject(AuthenticationService);

  form = this.fb.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: (g) => (g.get('newPassword')?.value === g.get('confirmPassword')?.value ? null : { mismatch: true }) }
  );
  loading = false;
  errorMessage = '';

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.form.hasError('mismatch')) return;
    this.loading = true;
    this.errorMessage = '';
    this.auth
      .changePassword(this.form.value.currentPassword!, this.form.value.newPassword!)
      .subscribe({
        next: () => this.activeModal.close(true),
        error: (err) => {
          this.loading = false;
          this.errorMessage = err?.error?.error || err?.message || 'Error al cambiar contraseña';
        },
      });
  }
}

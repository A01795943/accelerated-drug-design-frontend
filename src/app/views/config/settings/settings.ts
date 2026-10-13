import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SettingsService, type AppSetting } from '@core/services/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.html',
})
export class SettingsPage implements OnInit {
  readonly factorKey = 'generation.max_attempt_factor';
  readonly highFactor = 50;

  rows: AppSetting[] = [];
  controls = new Map<string, FormControl<string>>();
  loading = true;
  error: string | null = null;
  savingKey: string | null = null;

  private settings = inject(SettingsService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.settings.list().subscribe({
      next: (rows) => {
        this.rows = rows;
        this.controls.clear();
        for (const row of rows) {
          this.controls.set(row.key, this.controlFor(row));
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = this.message(err);
        this.loading = false;
      },
    });
  }

  groups(): string[] {
    const seen: string[] = [];
    for (const row of this.rows) {
      if (!seen.includes(row.group)) {
        seen.push(row.group);
      }
    }
    return seen;
  }

  inGroup(group: string): AppSetting[] {
    return this.rows.filter((row) => row.group === group);
  }

  control(row: AppSetting): FormControl<string> {
    return this.controls.get(row.key)!;
  }

  numeric(row: AppSetting): number | null {
    const raw = this.control(row)?.value;
    if (raw == null || String(raw).trim() === '') {
      return null;
    }
    const value = Number(raw);
    return Number.isInteger(value) ? value : null;
  }

  attemptsForHundred(row: AppSetting): number | null {
    const value = this.numeric(row);
    return value == null ? null : value * 100;
  }

  save(row: AppSetting): void {
    const control = this.control(row);
    control.markAsTouched();
    if (control.invalid || this.savingKey) {
      return;
    }
    this.savingKey = row.key;
    this.settings.update(row.key, String(control.value).trim()).subscribe({
      next: (saved) => {
        const index = this.rows.findIndex((item) => item.key === saved.key);
        if (index >= 0) {
          this.rows[index] = saved;
        }
        control.setValue(saved.value);
        this.savingKey = null;
        this.toastr.success('Ajuste guardado.');
      },
      error: (err) => {
        this.savingKey = null;
        this.toastr.error(this.message(err));
      },
    });
  }

  private controlFor(row: AppSetting): FormControl<string> {
    const validators = [Validators.required];
    if (row.type === 'integer') {
      validators.push(Validators.pattern(/^-?\d+$/));
      if (row.min != null) {
        validators.push(Validators.min(row.min));
      }
      if (row.max != null) {
        validators.push(Validators.max(row.max));
      }
    }
    return new FormControl(row.value, { nonNullable: true, validators });
  }

  private message(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      const body = err.error;
      if (body && typeof body === 'object' && 'error' in body && typeof body.error === 'string') {
        return body.error;
      }
      return err.message;
    }
    return 'No se pudo contactar el servidor.';
  }
}

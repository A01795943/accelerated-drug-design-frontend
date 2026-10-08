import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CoreInstanceService,
  type CoreInstance,
  type CoreInstanceCreate,
  type CoreInstanceHealthState,
  type CoreInstancePatch,
  type CoreInstanceWindow,
} from '@core/services/core-instance.service';

@Component({
  selector: 'app-core-instances',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbTooltipModule],
  templateUrl: './core-instances.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreInstances implements OnInit {
  readonly days: { value: 1 | 2 | 3 | 4 | 5 | 6 | 7; label: string }[] = [
    { value: 1, label: 'Lun' },
    { value: 2, label: 'Mar' },
    { value: 3, label: 'Mié' },
    { value: 4, label: 'Jue' },
    { value: 5, label: 'Vie' },
    { value: 6, label: 'Sáb' },
    { value: 7, label: 'Dom' },
  ];

  instances: CoreInstance[] = [];
  loading = true;
  error: string | null = null;
  actionError: string | null = null;

  formOpen = false;
  formLoading = false;
  formError = '';
  showAdvanced = false;
  editing: CoreInstance | null = null;
  form: FormGroup;

  private coreInstanceService = inject(CoreInstanceService);
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      baseUrl: ['', [Validators.required]],
      enabled: [true],
      restrictSchedule: [false],
      maxJobMinutes: [''],
      connectTimeoutMs: [''],
      readTimeoutMs: [''],
      windows: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.load();
  }

  get windows(): FormArray {
    return this.form.get('windows') as FormArray;
  }

  get restrictSchedule(): boolean {
    return !!this.form.get('restrictSchedule')?.value;
  }

  load(): void {
    this.loading = true;
    this.error = null;
    this.coreInstanceService.list().subscribe({
      next: (data) => {
        this.instances = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = this.formatApiError(err, 'Error al cargar instancias');
        this.loading = false;
      },
    });
  }

  openCreate(): void {
    this.editing = null;
    this.formError = '';
    this.showAdvanced = false;
    this.form.reset({
      name: '',
      baseUrl: '',
      enabled: true,
      restrictSchedule: false,
      maxJobMinutes: '',
      connectTimeoutMs: '',
      readTimeoutMs: '',
    });
    this.windows.clear();
    this.addWindow();
    this.formOpen = true;
  }

  openEdit(instance: CoreInstance): void {
    this.editing = instance;
    this.formError = '';
    this.showAdvanced = !!(instance.connectTimeoutMs || instance.readTimeoutMs);
    this.form.reset({
      name: instance.name,
      baseUrl: instance.baseUrl,
      enabled: instance.enabled,
      restrictSchedule: instance.restrictSchedule,
      maxJobMinutes: instance.maxJobMinutes ?? '',
      connectTimeoutMs: instance.connectTimeoutMs ?? '',
      readTimeoutMs: instance.readTimeoutMs ?? '',
    });
    this.windows.clear();
    const existing = instance.windows?.length ? instance.windows : [];
    if (existing.length === 0) {
      this.addWindow();
    } else {
      for (const window of existing) {
        this.addWindow(window);
      }
    }
    this.formOpen = true;
  }

  closeForm(): void {
    this.formOpen = false;
    this.editing = null;
  }

  addWindow(window?: CoreInstanceWindow): void {
    this.windows.push(
      this.fb.group({
        dayOfWeek: [window?.dayOfWeek ?? 1, Validators.required],
        startTime: [this.toHHmm(window?.startTime) || '08:00', Validators.required],
        endTime: [this.toHHmm(window?.endTime) || '20:00', Validators.required],
      }),
    );
  }

  removeWindow(index: number): void {
    this.windows.removeAt(index);
  }

  submitForm(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const payload = this.buildPayload();
    this.formLoading = true;
    this.formError = '';
    const request$ = this.editing
      ? this.coreInstanceService.patch(this.editing.id, payload)
      : this.coreInstanceService.create(payload as CoreInstanceCreate);

    request$.subscribe({
      next: () => {
        this.formLoading = false;
        this.closeForm();
        this.load();
      },
      error: (err) => {
        this.formLoading = false;
        this.formError = this.formatApiError(err, 'No se pudo guardar la instancia');
      },
    });
  }

  toggleEnabled(instance: CoreInstance): void {
    this.actionError = null;
    this.coreInstanceService.patch(instance.id, { enabled: !instance.enabled }).subscribe({
      next: () => this.load(),
      error: (err) => {
        this.actionError = this.formatApiError(err, 'No se pudo actualizar el estado');
      },
    });
  }

  deleteInstance(instance: CoreInstance): void {
    const ok = window.confirm(
      `¿Eliminar la instancia "${instance.name}"? Si está ocupada o tiene historial, deshabilítala en su lugar.`,
    );
    if (!ok) {
      return;
    }
    this.actionError = null;
    this.coreInstanceService.delete(instance.id).subscribe({
      next: () => this.load(),
      error: (err) => {
        this.actionError = this.formatApiError(
          err,
          'No se puede eliminar. Deshabilítala en su lugar.',
        );
      },
    });
  }

  healthBadgeClass(state: CoreInstanceHealthState | string | undefined): string {
    switch ((state || 'UNKNOWN').toUpperCase()) {
      case 'UP':
        return 'bg-success-subtle text-success';
      case 'DOWN':
        return 'bg-danger-subtle text-danger';
      default:
        return 'bg-secondary-subtle text-secondary';
    }
  }

  isBusy(instance: CoreInstance): boolean {
    return !!instance.currentRunId;
  }

  private buildPayload(): CoreInstanceCreate | CoreInstancePatch {
    const v = this.form.getRawValue();
    const windows = this.windows.controls.map((ctrl) => {
      const row = ctrl.getRawValue() as {
        dayOfWeek: number;
        startTime: string;
        endTime: string;
      };
      return {
        dayOfWeek: Number(row.dayOfWeek) as 1 | 2 | 3 | 4 | 5 | 6 | 7,
        startTime: this.toHHmm(row.startTime),
        endTime: this.toHHmm(row.endTime),
      };
    });
    const payload: CoreInstanceCreate | CoreInstancePatch = {
      name: String(v.name).trim(),
      baseUrl: String(v.baseUrl).trim(),
      enabled: !!v.enabled,
      restrictSchedule: !!v.restrictSchedule,
      maxJobMinutes: this.optionalInt(v.maxJobMinutes),
      connectTimeoutMs: this.optionalInt(v.connectTimeoutMs),
      readTimeoutMs: this.optionalInt(v.readTimeoutMs),
    };
    if (v.restrictSchedule) {
      payload.windows = windows;
    } else if (!this.editing) {
      payload.windows = [];
    }
    return payload;
  }

  private optionalInt(value: unknown): number | null {
    if (value === '' || value == null) {
      return null;
    }
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  private toHHmm(value: string | undefined | null): string {
    if (!value) {
      return '';
    }
    return value.length >= 5 ? value.slice(0, 5) : value;
  }

  formatApiError(err: unknown, fallback: string): string {
    const http = err as HttpErrorResponse;
    const backend = http?.error?.error || http?.error?.message;
    if (http?.status === 400) {
      return (
        backend ||
        'La baseUrl no está permitida. Usa una dirección privada, loopback o Tailscale (100.x).'
      );
    }
    if (http?.status === 409) {
      return (
        backend ||
        'No se puede eliminar una instancia ocupada o con historial. Deshabilítala (enabled=false) en su lugar.'
      );
    }
    return backend || http?.message || fallback;
  }
}

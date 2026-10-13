import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { forkJoin, interval, Subscription } from 'rxjs';
import {
  CoreAdminService,
  CoreInstanceService,
  type CoreAdminInstance,
  type CoreInstance,
  type CoreInstanceWindow,
  type CoreMetricSample,
  type GpuReading,
  type LoadPolicy,
  type RunningMinibatch,
} from '@core/services/core-instance.service';

type CoreCard = CoreAdminInstance & {
  restrictSchedule: boolean;
  maxJobMinutes?: number | null;
  connectTimeoutMs?: number | null;
  readTimeoutMs?: number | null;
  windows: CoreInstanceWindow[];
};

@Component({
  selector: 'app-cores-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ChartComponent],
  templateUrl: './cores.html',
})
export class CoresAdmin implements OnInit, OnDestroy {
  readonly days: { value: 1 | 2 | 3 | 4 | 5 | 6 | 7; label: string }[] = [
    { value: 1, label: 'Lun' },
    { value: 2, label: 'Mar' },
    { value: 3, label: 'Mié' },
    { value: 4, label: 'Jue' },
    { value: 5, label: 'Vie' },
    { value: 6, label: 'Sáb' },
    { value: 7, label: 'Dom' },
  ];
  readonly ranges = [
    { hours: 1, label: '1 h' },
    { hours: 6, label: '6 h' },
    { hours: 24, label: '24 h' },
    { hours: 168, label: '7 d' },
  ];

  instances: CoreCard[] = [];
  policy: LoadPolicy | null = null;
  loading = true;
  error: string | null = null;
  actionError: string | null = null;
  savingId: number | null = null;
  autoRefresh = true;
  lastUpdated: Date | null = null;
  expandedId: number | null = null;
  historyHours: Record<number, number> = {};
  historyLoading = false;
  chart: { series: unknown[]; chart: unknown; xaxis: unknown; yaxis: unknown; stroke: unknown } | null = null;

  formOpen = false;
  formLoading = false;
  formError = '';
  editing: CoreCard | null = null;
  form: FormGroup;

  private cores = inject(CoreAdminService);
  private pool = inject(CoreInstanceService);
  private fb = inject(FormBuilder);
  private refreshSub?: Subscription;

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      baseUrl: ['', Validators.required],
      enabled: [true],
      restrictSchedule: [false],
      maxJobMinutes: [''],
      connectTimeoutMs: [''],
      readTimeoutMs: [''],
      maxConcurrentRuns: [1, [Validators.required, Validators.min(1)]],
      windows: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.load(true);
    this.armRefresh();
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
  }

  get windows(): FormArray {
    return this.form.get('windows') as FormArray;
  }

  get restrictSchedule(): boolean {
    return !!this.form.get('restrictSchedule')?.value;
  }

  load(initial = false): void {
    if (initial) {
      this.loading = true;
    }
    this.error = null;
    forkJoin({
      cores: this.cores.list(),
      pool: this.pool.list(),
      policy: this.cores.loadPolicy(),
    }).subscribe({
      next: ({ cores, pool, policy }) => {
        const byId = new Map(pool.map((row) => [row.id, row]));
        this.instances = cores.map((row) => this.merge(row, byId.get(row.id)));
        this.policy = policy;
        this.loading = false;
        this.lastUpdated = new Date();
      },
      error: (err) => {
        this.error = this.formatApiError(err, 'Error al cargar instancias');
        this.loading = false;
      },
    });
  }

  toggleAutoRefresh(): void {
    this.autoRefresh = !this.autoRefresh;
    this.armRefresh();
  }

  occupancyLabel(row: CoreCard): string {
    const ratio = `${row.inFlightTotal}/${row.maxConcurrentRuns}`;
    if (row.occupancy === 'FULL') return `Llena ${ratio}`;
    if (row.occupancy === 'IN_USE') return `En uso ${ratio}`;
    return 'Libre';
  }

  occupancyClass(row: CoreCard): string {
    if (row.occupancy === 'FULL') return 'bg-danger';
    if (row.occupancy === 'IN_USE') return 'bg-primary';
    return 'bg-success';
  }

  statusLabel(status: string | null | undefined): string {
    switch (status) {
      case 'AVAILABLE':
        return 'Disponible';
      case 'OVERLOADED':
        return 'Sobrecargada';
      case 'UNAVAILABLE':
        return 'No disponible';
      default:
        return status || 'Sin estado';
    }
  }

  statusClass(status: string): string {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-success';
      case 'OVERLOADED':
        return 'bg-warning text-dark';
      case 'UNAVAILABLE':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  lastMetrics(row: CoreCard): string {
    if (!row.lastMetricsAt) return 'sin métrica';
    const parsed = new Date(row.lastMetricsAt);
    return Number.isNaN(parsed.getTime()) ? 'sin métrica' : parsed.toLocaleString();
  }

  meter(row: CoreCard, kind: 'cpu' | 'memory' | 'disk'): { text: string; label: string; klass: string; width: number } {
    const metrics = this.metrics(row);
    const value = kind === 'cpu' ? metrics?.cpu?.percent : kind === 'memory' ? metrics?.memory?.percent : metrics?.disk?.percent;
    return this.scale(value, this.enter(kind), this.recover(kind));
  }

  gpuLine(gpu: GpuReading): string {
    if (gpu.memUsedMb == null || gpu.memTotalMb == null) {
      const util = gpu.utilPercent == null ? 'sin VRAM' : `${gpu.utilPercent.toFixed(0)} %`;
      return util;
    }
    const percent = gpu.memPercent == null ? (gpu.memUsedMb / gpu.memTotalMb) * 100 : gpu.memPercent;
    return `${this.gb(gpu.memUsedMb)} GB de ${this.gb(gpu.memTotalMb)} GB (${percent.toFixed(0)} %)`;
  }

  gpuMeter(gpu: GpuReading, field: 'util' | 'mem'): { text: string; label: string; klass: string; width: number } {
    const value = field === 'util' ? gpu.utilPercent : gpu.memPercent;
    const kind = field === 'util' ? 'gpuUtil' : 'gpuMem';
    return this.scale(value ?? undefined, this.enter(kind), this.recover(kind));
  }

  elapsed(startedAt?: string | null): string {
    if (!startedAt) return '—';
    const minutes = Math.max(0, Math.floor((Date.now() - new Date(startedAt).getTime()) / 60000));
    if (minutes < 60) return `${minutes} min`;
    return `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
  }

  jobLink(row: RunningMinibatch): string[] | null {
    if (row.projectId == null || row.generationJobId == null) return null;
    return ['/projects/detail', String(row.projectId), 'job', String(row.generationJobId)];
  }

  toggleEnabled(row: CoreCard): void {
    const next = !row.enabled;
    if (!next && row.inFlightTotal > 0) {
      const ok = window.confirm(
        `Esta instancia tiene trabajo en curso:\n${this.runningText(row)}\n\nDeshabilitar no detiene lo que ya corre. ¿Continuar?`,
      );
      if (!ok) return;
    }
    this.savingId = row.id;
    this.actionError = null;
    this.cores.patch(row.id, { enabled: next }).subscribe({
      next: () => {
        this.savingId = null;
        this.load(false);
      },
      error: (err) => {
        this.actionError = this.formatApiError(err, 'No se pudo actualizar el estado');
        this.savingId = null;
      },
    });
  }

  refresh(row: CoreCard): void {
    this.savingId = row.id;
    this.cores.refresh(row.id).subscribe({
      next: () => {
        this.savingId = null;
        this.load(false);
      },
      error: (err) => {
        this.actionError = this.formatApiError(err, 'No se pudo refrescar');
        this.savingId = null;
      },
    });
  }

  toggleHistory(row: CoreCard): void {
    if (this.expandedId === row.id) {
      this.expandedId = null;
      this.chart = null;
      return;
    }
    this.expandedId = row.id;
    this.historyHours[row.id] = this.historyHours[row.id] ?? 1;
    this.loadHistory(row);
  }

  setRange(row: CoreCard, hours: number): void {
    this.historyHours[row.id] = hours;
    this.loadHistory(row);
  }

  openCreate(): void {
    this.editing = null;
    this.formError = '';
    this.form.reset({
      name: '',
      baseUrl: '',
      enabled: true,
      restrictSchedule: false,
      maxJobMinutes: '',
      connectTimeoutMs: '',
      readTimeoutMs: '',
      maxConcurrentRuns: 1,
    });
    this.windows.clear();
    this.addWindow();
    this.formOpen = true;
  }

  openEdit(row: CoreCard): void {
    this.editing = row;
    this.formError = '';
    this.form.reset({
      name: row.name,
      baseUrl: row.baseUrl,
      enabled: row.enabled,
      restrictSchedule: row.restrictSchedule,
      maxJobMinutes: row.maxJobMinutes ?? '',
      connectTimeoutMs: row.connectTimeoutMs ?? '',
      readTimeoutMs: row.readTimeoutMs ?? '',
      maxConcurrentRuns: row.maxConcurrentRuns,
    });
    this.windows.clear();
    const existing = row.windows?.length ? row.windows : [];
    if (existing.length === 0) this.addWindow();
    else existing.forEach((window) => this.addWindow(window));
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
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    const windows = this.windows.controls.map((ctrl) => {
      const row = ctrl.getRawValue() as { dayOfWeek: number; startTime: string; endTime: string };
      return {
        dayOfWeek: Number(row.dayOfWeek) as 1 | 2 | 3 | 4 | 5 | 6 | 7,
        startTime: this.toHHmm(row.startTime),
        endTime: this.toHHmm(row.endTime),
      };
    });
    const payload = {
      name: String(value.name).trim(),
      baseUrl: String(value.baseUrl).trim(),
      enabled: !!value.enabled,
      restrictSchedule: !!value.restrictSchedule,
      maxJobMinutes: this.optionalInt(value.maxJobMinutes),
      connectTimeoutMs: this.optionalInt(value.connectTimeoutMs),
      readTimeoutMs: this.optionalInt(value.readTimeoutMs),
      windows: value.restrictSchedule ? windows : this.editing ? undefined : [],
    };
    this.formLoading = true;
    this.formError = '';
    const request$ = this.editing
      ? this.pool.patch(this.editing.id, payload)
      : this.pool.create(payload);
    request$.subscribe({
      next: (saved) => {
        this.cores.patch(saved.id, { maxConcurrentRuns: Number(value.maxConcurrentRuns) }).subscribe({
          next: () => {
            this.formLoading = false;
            this.closeForm();
            this.load(false);
          },
          error: (err) => {
            this.formLoading = false;
            this.formError = this.formatApiError(err, 'No se pudo guardar el máximo concurrente');
          },
        });
      },
      error: (err) => {
        this.formLoading = false;
        this.formError = this.formatApiError(err, 'No se pudo guardar la instancia');
      },
    });
  }

  deleteInstance(row: CoreCard): void {
    if (row.inFlightTotal > 0) {
      window.alert(
        `No se puede eliminar mientras hay trabajo en curso:\n${this.runningText(row)}\n\nDeshabilítala si no quieres nuevos despachos. Eso no detiene lo que ya corre.`,
      );
      return;
    }
    if (!window.confirm(`¿Eliminar la instancia "${row.name}"?`)) return;
    this.pool.delete(row.id).subscribe({
      next: () => this.load(false),
      error: (err) => {
        this.actionError = this.formatApiError(err, 'No se puede eliminar. Deshabilítala en su lugar.');
      },
    });
  }

  formatApiError(err: unknown, fallback: string): string {
    const http = err as HttpErrorResponse;
    const backend = http?.error?.error || http?.error?.message;
    if (http?.status === 400) {
      return backend || 'La baseUrl no está permitida. Usa una dirección privada, loopback o Tailscale (100.x).';
    }
    if (http?.status === 409) {
      return backend || 'No se puede eliminar una instancia ocupada. Deshabilítala (enabled=false) en su lugar.';
    }
    return backend || http?.message || fallback;
  }

  private loadHistory(row: CoreCard): void {
    this.historyLoading = true;
    this.cores.history(row.id, this.historyHours[row.id] ?? 1).subscribe({
      next: (points) => {
        this.chart = this.buildChart(points);
        this.historyLoading = false;
      },
      error: (err) => {
        this.actionError = this.formatApiError(err, 'No se pudo cargar el histórico');
        this.historyLoading = false;
      },
    });
  }

  private buildChart(points: CoreMetricSample[]) {
    const series = (name: string, pick: (point: CoreMetricSample) => number | null | undefined) => ({
      name,
      data: points.map((point) => ({ x: point.collectedAt, y: pick(point) ?? null })),
    });
    return {
      series: [
        series('CPU', (point) => point.cpuPercent),
        series('RAM', (point) => point.memPercent),
        series('GPU', (point) => point.gpuUtilPercent),
        series('Disco', (point) => point.diskPercent),
        series('VRAM', (point) => (point.gpuMemUsedMb == null ? null : Number((point.gpuMemUsedMb / 1024).toFixed(1)))),
      ],
      chart: { type: 'line', height: 260, toolbar: { show: false }, animations: { enabled: false } },
      stroke: { width: 2, curve: 'straight' },
      xaxis: { type: 'datetime' },
      yaxis: [
        { seriesName: 'CPU', min: 0, max: 100, title: { text: '%' } },
        { seriesName: 'RAM', show: false, min: 0, max: 100 },
        { seriesName: 'GPU', show: false, min: 0, max: 100 },
        { seriesName: 'Disco', show: false, min: 0, max: 100 },
        { seriesName: 'VRAM', opposite: true, title: { text: 'GB' }, decimalsInFloat: 1 },
      ],
    };
  }

  private merge(row: CoreAdminInstance, extra: CoreInstance | undefined): CoreCard {
    return {
      ...row,
      runningMinibatches: row.runningMinibatches ?? [],
      gpus: row.gpus ?? [],
      inFlightTotal: row.inFlightTotal ?? row.inFlightMinibatches ?? 0,
      occupancy: row.occupancy ?? 'FREE',
      gpuDataAvailable: row.gpuDataAvailable ?? false,
      restrictSchedule: extra?.restrictSchedule ?? false,
      maxJobMinutes: extra?.maxJobMinutes,
      connectTimeoutMs: extra?.connectTimeoutMs,
      readTimeoutMs: extra?.readTimeoutMs,
      windows: extra?.windows ?? [],
    };
  }

  private metrics(row: CoreCard): { cpu?: { percent?: number }; memory?: { percent?: number }; disk?: { percent?: number } } | null {
    if (!row.lastMetricsJson) return null;
    try {
      return JSON.parse(row.lastMetricsJson);
    } catch {
      return null;
    }
  }

  private scale(value: number | undefined, enter: number, recover: number) {
    if (value == null || Number.isNaN(value)) {
      return { text: 'Sin dato', label: 'Sin dato', klass: 'text-muted', width: 0 };
    }
    const label = value > enter ? 'Alto' : value >= recover ? 'Elevado' : 'Normal';
    const klass = value > enter ? 'text-danger' : value >= recover ? 'text-warning' : 'text-success';
    return { text: `${value.toFixed(0)} % · ${label}`, label, klass, width: Math.max(0, Math.min(100, value)) };
  }

  private enter(kind: 'cpu' | 'memory' | 'disk' | 'gpuUtil' | 'gpuMem'): number {
    if (!this.policy) return 90;
    if (kind === 'cpu') return this.policy.cpuEnter;
    if (kind === 'memory') return this.policy.memoryEnter;
    if (kind === 'disk') return this.policy.diskEnter;
    if (kind === 'gpuUtil') return this.policy.gpuUtilEnter;
    return this.policy.gpuMemEnter;
  }

  private recover(kind: 'cpu' | 'memory' | 'disk' | 'gpuUtil' | 'gpuMem'): number {
    if (!this.policy) return 80;
    if (kind === 'cpu') return this.policy.cpuRecover;
    if (kind === 'memory') return this.policy.memoryRecover;
    if (kind === 'disk') return this.policy.diskRecover;
    if (kind === 'gpuUtil') return this.policy.gpuUtilRecover;
    return this.policy.gpuMemRecover;
  }

  private gb(mb: number): string {
    return (mb / 1024).toFixed(1);
  }

  private runningText(row: CoreCard): string {
    const lines = row.runningMinibatches.map(
      (minibatch) =>
        `job ${minibatch.generationJobId}, minibatch ${minibatch.idx}, backbone ${minibatch.backboneName ?? '—'}, T=${minibatch.temperature ?? '—'}`,
    );
    if (row.otherRun) lines.push(`${row.otherRun.kind} ${row.otherRun.runId}`);
    return lines.join('\n') || 'un run en vuelo';
  }

  private armRefresh(): void {
    this.refreshSub?.unsubscribe();
    if (!this.autoRefresh) return;
    this.refreshSub = interval(30000).subscribe(() => this.load(false));
  }

  private optionalInt(value: unknown): number | null {
    if (value === '' || value == null) return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private toHHmm(value: string | undefined | null): string {
    if (!value) return '';
    return value.length >= 5 ? value.slice(0, 5) : value;
  }
}

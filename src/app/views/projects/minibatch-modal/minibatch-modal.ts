import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ProjectService,
  type GenerationJobMinibatches,
  type GenerationJobMinibatchRow,
  type MinibatchAttempt,
} from '@core/services/project.service';

@Component({
  selector: 'app-minibatch-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './minibatch-modal.html',
})
export class MinibatchModal implements OnInit, OnDestroy {
  projectId!: number;
  jobId!: number;

  data: GenerationJobMinibatches | null = null;
  loading = true;
  error: string | null = null;
  expandedIdx: number | null = null;

  private activeModal = inject(NgbActiveModal);
  private projectService = inject(ProjectService);
  private pollTimer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  close(): void {
    this.activeModal.dismiss();
  }

  toggle(idx: number): void {
    this.expandedIdx = this.expandedIdx === idx ? null : idx;
  }

  previousAttempts(row: GenerationJobMinibatchRow): MinibatchAttempt[] {
    const history = row.attemptHistory ?? [];
    if (history.length <= 1) return [];
    return history.slice(0, history.length - 1);
  }

  progressPercent(): number {
    const total = this.data?.totalMinibatches ?? this.data?.minibatches.length ?? 0;
    if (!total) return 0;
    const done = this.data?.completedMinibatches
      ?? this.data?.minibatches.filter((row) => row.status === 'COMPLETED').length
      ?? 0;
    return Math.min(100, Math.round((done / total) * 100));
  }

  completedLabel(): string {
    const total = this.data?.totalMinibatches ?? this.data?.minibatches.length ?? 0;
    const done = this.data?.completedMinibatches
      ?? this.data?.minibatches.filter((row) => row.status === 'COMPLETED').length
      ?? 0;
    return `${done}/${total}`;
  }

  instanceSummaries(): { key: string; name: string; count: number; avg: string }[] {
    const buckets = new Map<string, { name: string; count: number; durations: number[] }>();
    for (const row of this.data?.minibatches ?? []) {
      for (const attempt of row.attemptHistory ?? []) {
        const id = attempt.instance?.id;
        const key = id != null ? String(id) : 'none';
        const name = attempt.instance?.name || attempt.instance?.baseUrl || 'Sin instancia';
        const bucket = buckets.get(key) ?? { name, count: 0, durations: [] };
        bucket.count += 1;
        if (attempt.startedAt && attempt.finishedAt && attempt.durationMillis != null) {
          bucket.durations.push(attempt.durationMillis);
        }
        buckets.set(key, bucket);
      }
    }
    return [...buckets.entries()].map(([key, bucket]) => {
      const avg = bucket.durations.length
        ? bucket.durations.reduce((sum, value) => sum + value, 0) / bucket.durations.length
        : null;
      return { key, name: bucket.name, count: bucket.count, avg: formatDuration(avg) };
    });
  }

  statusLabel(status: string | null | undefined): string {
    switch ((status || '').toUpperCase()) {
      case 'PENDING':
        return 'Pendiente';
      case 'QUEUED':
        return 'En cola';
      case 'RUNNING':
        return 'En ejecución';
      case 'COMPLETED':
        return 'Completado';
      case 'ERROR':
        return 'Error';
      default:
        return status || '—';
    }
  }

  statusClass(status: string | null | undefined): string {
    switch ((status || '').toUpperCase()) {
      case 'COMPLETED':
        return 'bg-success-subtle text-success';
      case 'RUNNING':
        return 'bg-primary-subtle text-primary';
      case 'ERROR':
        return 'bg-danger-subtle text-danger';
      case 'PENDING':
      case 'QUEUED':
        return 'bg-warning-subtle text-warning';
      default:
        return 'bg-secondary-subtle text-secondary';
    }
  }

  when(value: string | null | undefined): string {
    if (!value) return '—';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '—';
    return parsed.toLocaleString();
  }

  duration(ms: number | null | undefined): string {
    return formatDuration(ms);
  }

  jobDuration(): number | null {
    if (!this.data?.jobStartedAt) return null;
    const start = new Date(this.data.jobStartedAt).getTime();
    if (Number.isNaN(start)) return null;
    const end = this.data.jobCompletedAt ? new Date(this.data.jobCompletedAt).getTime() : Date.now();
    if (Number.isNaN(end)) return null;
    return Math.max(0, end - start);
  }

  instanceName(row: GenerationJobMinibatchRow): string {
    return row.instance?.name || row.instance?.baseUrl || '—';
  }

  private load(): void {
    this.projectService.getGenerationJobMinibatches(this.projectId, this.jobId).subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
        this.error = null;
        if ((data.jobStatus || '').toUpperCase() === 'RUNNING') {
          this.startPolling();
        } else {
          this.stopPolling();
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'No se pudieron cargar los minibatches.';
        this.stopPolling();
      },
    });
  }

  private startPolling(): void {
    if (this.pollTimer != null) return;
    this.pollTimer = setInterval(() => this.load(), 10_000);
  }

  private stopPolling(): void {
    if (this.pollTimer != null) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }
}

function formatDuration(ms: number | null | undefined): string {
  if (ms == null || Number.isNaN(ms) || ms < 0) return '—';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

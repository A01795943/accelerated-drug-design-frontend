import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {
  CoreAdminService,
  type CoreAdminInstance,
  type CoreSystemMetricsSnapshot,
} from '@core/services/core-instance.service';

@Component({
  selector: 'app-cores-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cores.html',
})
export class CoresAdmin implements OnInit {
  instances: CoreAdminInstance[] = [];
  drafts: Record<number, number> = {};
  loading = true;
  error: string | null = null;
  actionError: string | null = null;
  savingId: number | null = null;

  private cores = inject(CoreAdminService);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;
    this.cores.list().subscribe({
      next: (rows) => {
        this.instances = rows;
        this.drafts = {};
        for (const row of rows) {
          this.drafts[row.id] = row.maxConcurrentRuns;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = this.message(err);
        this.loading = false;
      },
    });
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

  metrics(row: CoreAdminInstance): CoreSystemMetricsSnapshot | null {
    if (!row.lastMetricsJson) return null;
    try {
      return JSON.parse(row.lastMetricsJson) as CoreSystemMetricsSnapshot;
    } catch {
      return null;
    }
  }

  cpu(row: CoreAdminInstance): string {
    return this.percent(this.metrics(row)?.cpu?.percent);
  }

  ram(row: CoreAdminInstance): string {
    return this.percent(this.metrics(row)?.memory?.percent);
  }

  gpu(row: CoreAdminInstance): string {
    const gpus = this.metrics(row)?.gpus ?? [];
    if (gpus.length === 0) return '—';
    const max = Math.max(...gpus.map((g) => g.util_percent ?? 0));
    return this.percent(max);
  }

  disk(row: CoreAdminInstance): string {
    return this.percent(this.metrics(row)?.disk?.percent);
  }

  network(row: CoreAdminInstance): string {
    const net = this.metrics(row)?.network;
    if (!net) return '—';
    const sent = net.sent_per_sec ?? 0;
    const recv = net.recv_per_sec ?? 0;
    return `↑ ${this.rate(sent)}  ↓ ${this.rate(recv)}`;
  }

  toggleEnabled(row: CoreAdminInstance): void {
    this.savingId = row.id;
    this.actionError = null;
    this.cores.patch(row.id, { enabled: !row.enabled }).subscribe({
      next: (updated) => this.replace(updated),
      error: (err) => {
        this.actionError = this.message(err);
        this.savingId = null;
      },
    });
  }

  saveMax(row: CoreAdminInstance): void {
    const value = this.drafts[row.id];
    if (value == null || value < 1 || value === row.maxConcurrentRuns) return;
    this.savingId = row.id;
    this.actionError = null;
    this.cores.patch(row.id, { maxConcurrentRuns: value }).subscribe({
      next: (updated) => this.replace(updated),
      error: (err) => {
        this.actionError = this.message(err);
        this.savingId = null;
      },
    });
  }

  refresh(row: CoreAdminInstance): void {
    this.savingId = row.id;
    this.actionError = null;
    this.cores.refresh(row.id).subscribe({
      next: (updated) => this.replace(updated),
      error: (err) => {
        this.actionError = this.message(err);
        this.savingId = null;
      },
    });
  }

  private replace(updated: CoreAdminInstance): void {
    this.instances = this.instances.map((row) => (row.id === updated.id ? updated : row));
    this.drafts[updated.id] = updated.maxConcurrentRuns;
    this.savingId = null;
  }

  private percent(value: number | undefined): string {
    if (value == null || Number.isNaN(value)) return '—';
    return `${value.toFixed(0)}%`;
  }

  private rate(bytesPerSec: number): string {
    if (bytesPerSec >= 1024 * 1024) return `${(bytesPerSec / (1024 * 1024)).toFixed(1)} MB/s`;
    if (bytesPerSec >= 1024) return `${(bytesPerSec / 1024).toFixed(1)} KB/s`;
    return `${bytesPerSec.toFixed(0)} B/s`;
  }

  private message(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      const body = err.error;
      if (typeof body === 'string' && body) return body;
      if (body && typeof body === 'object' && 'message' in body && typeof body.message === 'string') {
        return body.message;
      }
      return err.message;
    }
    return 'No se pudo contactar el servidor.';
  }
}

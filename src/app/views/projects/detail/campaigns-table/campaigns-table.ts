import {
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EMPTY, Subscription, interval, switchMap } from 'rxjs';
import {
  ProjectService,
  type DataGenerationCampaignSummary,
} from '@core/services/project.service';

const POLL_INTERVAL_MS = 15_000;

@Component({
  selector: 'app-campaigns-table',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './campaigns-table.html',
  providers: [DatePipe],
})
export class CampaignsTable implements OnInit {
  @Input({ required: true }) projectId!: number;

  private readonly projectService = inject(ProjectService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly datePipe = inject(DatePipe);

  campaigns = signal<DataGenerationCampaignSummary[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  private pollSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.fetchCampaigns(true);
    this.destroyRef.onDestroy(() => this.stopPolling());
  }

  private fetchCampaigns(isInitialLoad: boolean): void {
    if (isInitialLoad) {
      this.loading.set(true);
    }

    this.projectService.listCampaigns(this.projectId).subscribe({
      next: (list) => {
        this.campaigns.set(list);
        this.loading.set(false);
        this.error.set(null);
        this.reconcilePolling(list);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(
          err?.error?.error || err?.message || 'Error al cargar campañas'
        );
      },
    });
  }

  /**
   * Poll every 15s while at least one campaign is RUNNING; stop when all are terminal.
   * Restarts automatically if a subsequent fetch finds a RUNNING campaign again.
   */
  private reconcilePolling(list: DataGenerationCampaignSummary[]): void {
    if (list.some((c) => c.status === 'RUNNING')) {
      this.startPolling();
    } else {
      this.stopPolling();
    }
  }

  private startPolling(): void {
    if (this.pollSubscription) {
      return;
    }

    this.pollSubscription = interval(POLL_INTERVAL_MS)
      .pipe(
        switchMap(() => {
          if (!this.campaigns().some((c) => c.status === 'RUNNING')) {
            return EMPTY;
          }
          return this.projectService.listCampaigns(this.projectId);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (list) => {
          this.campaigns.set(list);
          this.error.set(null);
          if (!list.some((c) => c.status === 'RUNNING')) {
            this.stopPolling();
          }
        },
        error: (err) => {
          this.error.set(
            err?.error?.error || err?.message || 'Error al cargar campañas'
          );
        },
      });
  }

  private stopPolling(): void {
    this.pollSubscription?.unsubscribe();
    this.pollSubscription = null;
  }

  /** Same badge palette as backbones / generation jobs on project detail. */
  statusBadgeClass(
    status: DataGenerationCampaignSummary['status']
  ): string {
    switch (status) {
      case 'COMPLETED':
        return 'bg-success-subtle text-success';
      case 'PARTIAL':
      case 'ERROR':
        return 'bg-danger-subtle text-danger';
      default:
        return 'bg-primary-subtle text-primary';
    }
  }

  formatCreatedAt(iso: string): string {
    const date = new Date(iso);
    const diffMs = Date.now() - date.getTime();
    if (diffMs < 24 * 60 * 60 * 1000) {
      const diffSec = Math.round(diffMs / 1000);
      const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
      if (diffSec < 60) {
        return rtf.format(-diffSec, 'second');
      }
      if (diffSec < 3600) {
        return rtf.format(-Math.round(diffSec / 60), 'minute');
      }
      return rtf.format(-Math.round(diffSec / 3600), 'hour');
    }
    return this.datePipe.transform(date, 'short') ?? '—';
  }

  campaignLabel(campaign: DataGenerationCampaignSummary): string {
    return campaign.name?.trim() ? campaign.name : `#${campaign.id}`;
  }

  openAriaLabel(campaign: DataGenerationCampaignSummary): string {
    const label = this.campaignLabel(campaign);
    return `Abrir campaña ${label}`;
  }
}

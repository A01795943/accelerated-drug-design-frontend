import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import {
  ProjectService,
  type BackboneConfigDetail,
  type DataGenerationCampaignDetail,
} from '@core/services/project.service';
import { splitCommaSeparated } from '@views/projects/data-generation-campaign-create/campaign-form.utils';

const POLL_INTERVAL_MS = 15_000;

@Component({
  selector: 'app-data-generation-campaign-progress',
  standalone: true,
  imports: [RouterLink, NgbCollapseModule, DecimalPipe],
  templateUrl: './data-generation-campaign-progress.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DataGenerationCampaignProgress implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  projectId!: number;
  campaignId!: number;
  campaign: DataGenerationCampaignDetail | null = null;
  loading = true;
  error: string | null = null;

  /** Per-config collapse: missing key → first config expanded, rest collapsed. */
  private configCollapsed: Record<number, boolean> = {};

  private pollTimer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    this.campaignId = Number(this.route.snapshot.paramMap.get('campaignId'));
    this.loadCampaign();
    this.pollTimer = setInterval(() => this.loadCampaign(false), POLL_INTERVAL_MS);
  }

  ngOnDestroy(): void {
    if (this.pollTimer != null) {
      clearInterval(this.pollTimer);
    }
  }

  loadCampaign(showLoading = true): void {
    if (showLoading) {
      this.loading = true;
    }
    this.projectService.getDataGenerationCampaign(this.projectId, this.campaignId).subscribe({
      next: (c) => {
        this.campaign = c;
        this.loading = false;
        this.error = null;
        if (c.status !== 'RUNNING' && this.pollTimer != null) {
          clearInterval(this.pollTimer);
          this.pollTimer = null;
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.error || err?.message || 'Error al cargar la campaña';
      },
    });
  }

  isConfigCollapsed(index: number): boolean {
    return this.configCollapsed[index] ?? index !== 0;
  }

  toggleConfig(index: number): void {
    this.configCollapsed[index] = !this.isConfigCollapsed(index);
  }

  hotspotChips(config: BackboneConfigDetail): string[] {
    return splitCommaSeparated(config.hotspots);
  }

  chainChips(config: BackboneConfigDetail): string[] {
    return splitCommaSeparated(config.chainsToRemove);
  }

  configProgressPercent(config: BackboneConfigDetail): number {
    if (!config.numBackbones) {
      return 0;
    }
    return Math.round((config.completedBackbones / config.numBackbones) * 10000) / 100;
  }

  /** Same badge palette as project detail / campaigns table. */
  statusBadgeClass(status: string): string {
    switch ((status || '').toUpperCase()) {
      case 'COMPLETED':
        return 'bg-success-subtle text-success';
      case 'RUNNING':
        return 'bg-primary-subtle text-primary';
      case 'ERROR':
      case 'PARTIAL':
        return 'bg-danger-subtle text-danger';
      case 'SKIPPED':
        return 'bg-secondary-subtle text-secondary';
      case 'PENDING':
        return 'bg-light text-dark border';
      default:
        return 'bg-secondary-subtle text-secondary';
    }
  }
}

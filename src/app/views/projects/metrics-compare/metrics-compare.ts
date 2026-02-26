import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService, type Backbone, type GenerationJob, type GenerationJobRecord } from '@core/services/project.service';
import type { ChartOptions } from '@common/apexchart.model';
import { NgApexchartsModule } from 'ng-apexcharts';
import { forkJoin } from 'rxjs';

export interface MetricStats {
  min: number | null;
  max: number | null;
  promedio: number | null;
  media: number | null;
  desvEst: number | null;
  varianza: number | null;
}

function computeMetricStats(values: number[]): MetricStats {
  const empty: MetricStats = {
    min: null,
    max: null,
    promedio: null,
    media: null,
    desvEst: null,
    varianza: null,
  };
  if (values.length === 0) return empty;
  const sorted = [...values].sort((a, b) => a - b);
  const min = sorted[0] ?? null;
  const max = sorted[sorted.length - 1] ?? null;
  const sum = values.reduce((a, b) => a + b, 0);
  const promedio = sum / values.length;
  const media =
    sorted.length % 2 === 1
      ? (sorted[Math.floor(sorted.length / 2)] ?? null)
      : ((sorted[sorted.length / 2 - 1] ?? 0) + (sorted[sorted.length / 2] ?? 0)) / 2;
  const sqDiffs = values.map((v) => (v - promedio) ** 2);
  const varianza = sqDiffs.reduce((a, b) => a + b, 0) / values.length;
  const desvEst = Math.sqrt(varianza);
  return { min, max, promedio, media, desvEst, varianza };
}

function statsFromRecords(records: GenerationJobRecord[]): {
  mpnn: MetricStats;
  plddt: MetricStats;
  ptm: MetricStats;
  iPtm: MetricStats;
  pae: MetricStats;
  iPae: MetricStats;
  rmsd: MetricStats;
} {
  const empty: MetricStats = {
    min: null,
    max: null,
    promedio: null,
    media: null,
    desvEst: null,
    varianza: null,
  };
  const num = (v: unknown): number | null => {
    if (typeof v === 'number' && !Number.isNaN(v)) return v;
    if (typeof v === 'string') {
      const n = parseFloat(v);
      return !Number.isNaN(n) ? n : null;
    }
    return null;
  };
  const mpnnVals = records.map((x) => num(x.mpnn)).filter((v): v is number => v !== null);
  const plddtVals = records.map((x) => num(x.plddt)).filter((v): v is number => v !== null);
  const ptmVals = records.map((x) => num(x.ptm)).filter((v): v is number => v !== null);
  const iPtmVals = records.map((x) => num(x.iPtm)).filter((v): v is number => v !== null);
  const paeVals = records.map((x) => num(x.pae)).filter((v): v is number => v !== null);
  const iPaeVals = records.map((x) => num(x.iPae)).filter((v): v is number => v !== null);
  const rmsdVals = records.map((x) => num(x.rmsd)).filter((v): v is number => v !== null);
  return {
    mpnn: computeMetricStats(mpnnVals),
    plddt: computeMetricStats(plddtVals),
    ptm: computeMetricStats(ptmVals),
    iPtm: computeMetricStats(iPtmVals),
    pae: computeMetricStats(paeVals),
    iPae: computeMetricStats(iPaeVals),
    rmsd: computeMetricStats(rmsdVals),
  };
}

const STAT_KEYS: (keyof MetricStats)[] = ['min', 'max', 'promedio', 'media', 'desvEst', 'varianza'];
const STAT_LABELS = ['Mín', 'Máx', 'Promedio', 'Media', 'Desv. est.', 'Varianza'];
const METRIC_KEYS = ['mpnn', 'plddt', 'ptm', 'iPtm', 'pae', 'iPae', 'rmsd'] as const;
const METRIC_LABELS: Record<(typeof METRIC_KEYS)[number], string> = {
  mpnn: 'MPNN',
  plddt: 'pLDDT',
  ptm: 'pTM',
  iPtm: 'iPTM',
  pae: 'PAE',
  iPae: 'iPAE',
  rmsd: 'RMSD',
};

@Component({
  selector: 'app-metrics-compare',
  standalone: true,
  imports: [CommonModule, RouterLink, NgApexchartsModule],
  templateUrl: './metrics-compare.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MetricsCompare implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  projectId: number | null = null;
  jobIds: number[] = [];
  jobs: GenerationJob[] = [];
  runLabels: string[] = [];
  /** Backbones by id (for run info: contigs, hotspots, chainsToRemove, iterations). */
  backbonesById = new Map<number, Backbone>();
  /** Per-job metric stats (same order as jobIds). */
  jobsStats: { mpnn: MetricStats; plddt: MetricStats; ptm: MetricStats; iPtm: MetricStats; pae: MetricStats; iPae: MetricStats; rmsd: MetricStats }[] = [];
  loading = true;
  error: string | null = null;

  /** Run info for the top cards: one entry per job (same order as jobs). */
  get runInfoCards(): {
    runId: string;
    numSeqs: number | null;
    temperature: number | null;
    backboneName: string;
    contigs: string;
    hotspots: string;
    chainsToRemove: string;
    iterations: number | null;
  }[] {
    return this.jobs.map((job) => {
      const backbone = job.backboneId != null ? this.backbonesById.get(job.backboneId!) : undefined;
      return {
        runId: String(job.runId ?? job.id),
        numSeqs: job.numSeqs ?? null,
        temperature: job.temperature ?? null,
        backboneName: job.backboneName ?? backbone?.name ?? '—',
        contigs: backbone?.contigs?.trim() ?? '—',
        hotspots: backbone?.hotspots?.trim() ?? '—',
        chainsToRemove: backbone?.chainsToRemove?.trim() ?? '—',
        iterations: backbone?.iterations ?? null,
      };
    });
  }

  /** One chart config per metric. X-axis = stats (lower); legend = run names (upper). */
  get chartOptionsByMetric(): { key: string; label: string; options: Partial<ChartOptions> }[] {
    const labels = this.runLabels;
    const stats = this.jobsStats;
    if (labels.length === 0 || stats.length === 0) return [];
    const runColors = ['#4da6ff', '#22c55e', '#f9b931', '#ef5f5f', '#7f56da', '#4ecac2', '#ff86c8', '#040505'];
    return METRIC_KEYS.map((metricKey) => {
      const series = labels.map((runName, runIndex) => ({
        name: runName,
        data: STAT_KEYS.map((statKey) => {
          const v = stats[runIndex][metricKey][statKey];
          return v != null ? Number(v) : 0;
        }),
      }));
      const options: Partial<ChartOptions> = {
        chart: {
          type: 'bar',
          height: 360,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '70%',
          },
        },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 0, colors: ['transparent'] },
        fill: { opacity: 1 },
        xaxis: { categories: STAT_LABELS },
        yaxis: {
          title: { text: METRIC_LABELS[metricKey] },
          labels: {
            formatter: (val: number) => (val != null ? Number(val).toFixed(4) : ''),
          },
        },
        grid: { borderColor: '#e9ecef', strokeDashArray: 4 },
        legend: { position: 'top' },
        tooltip: {
          enabled: true,
          y: {
            formatter: (val: number) => (val != null ? Number(val).toFixed(4) : ''),
          },
        },
        series,
        colors: runColors,
      };
      return { key: metricKey, label: METRIC_LABELS[metricKey], options };
    });
  }

  ngOnInit(): void {
    const projectIdParam = this.route.snapshot.paramMap.get('projectId');
    const jobIdsParam = this.route.snapshot.queryParamMap.get('jobIds');
    if (!projectIdParam || !jobIdsParam) {
      this.loading = false;
      this.error = 'Faltan el ID del proyecto o los IDs de los jobs.';
      return;
    }
    this.projectId = Number(projectIdParam);
    this.jobIds = jobIdsParam
      .split(',')
      .map((s) => Number(s.trim()))
      .filter((n) => !Number.isNaN(n) && n > 0);
    if (this.jobIds.length < 2) {
      this.loading = false;
      this.error = 'Seleccione al menos dos runs para comparar.';
      return;
    }
    this.load();
  }

  load(): void {
    if (this.projectId == null) return;
    this.loading = true;
    this.error = null;
    const jobRequests = this.jobIds.map((jobId) =>
      this.projectService.getGenerationJob(this.projectId!, jobId)
    );
    forkJoin([
      forkJoin(jobRequests),
      this.projectService.getBackbones(this.projectId),
    ]).subscribe({
      next: ([jobs, backbones]) => {
        this.jobs = jobs;
        this.runLabels = jobs.map((j) => String(j.runId ?? j.id));
        this.backbonesById = new Map(backbones.map((b) => [b.id, b]));
        const recordRequests = this.jobIds.map((jobId) =>
          this.projectService.getGenerationJobRecords(this.projectId!, jobId, { size: 10000 })
        );
        forkJoin(recordRequests).subscribe({
          next: (recordsPerJob) => {
            this.jobsStats = recordsPerJob.map((records) => statsFromRecords(records));
            this.loading = false;
          },
          error: (err) => {
            this.error = err?.message || 'Error al cargar los registros.';
            this.loading = false;
          },
        });
      },
      error: (err) => {
        this.error = err?.message || 'Error al cargar los jobs o backbones.';
        this.loading = false;
      },
    });
  }
}

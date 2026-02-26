import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService, type GenerationJobDetailDto, type GenerationJobRecord } from '@core/services/project.service';
import { PdbContentModal } from '../project-detail/components/pdb-content-modal/pdb-content-modal';

export interface MetricStats {
  min: number | null;
  max: number | null;
  promedio: number | null;
  media: number | null;
  desvEst: number | null;
  varianza: number | null;
}

function computeMetricStats(values: number[]): MetricStats {
  const empty: MetricStats = { min: null, max: null, promedio: null, media: null, desvEst: null, varianza: null };
  if (values.length === 0) return empty;
  const sorted = [...values].sort((a, b) => a - b);
  const min = sorted[0] ?? null;
  const max = sorted[sorted.length - 1] ?? null;
  const sum = values.reduce((a, b) => a + b, 0);
  const promedio = sum / values.length;
  const media = sorted.length % 2 === 1
    ? (sorted[Math.floor(sorted.length / 2)] ?? null)
    : (((sorted[sorted.length / 2 - 1] ?? 0) + (sorted[sorted.length / 2] ?? 0)) / 2);
  const sqDiffs = values.map((v) => (v - promedio) ** 2);
  const varianza = sqDiffs.reduce((a, b) => a + b, 0) / values.length;
  const desvEst = Math.sqrt(varianza);
  return { min, max, promedio, media, desvEst, varianza };
}

@Component({
  selector: 'app-generation-job-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './generation-job-detail.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: [
    `
      .metric-stats-body {
        font-size: 1rem;
      }
    `,
  ],
})
export class GenerationJobDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private modalService = inject(NgbModal);
  private projectService = inject(ProjectService);

  projectId: number | null = null;
  jobId: number | null = null;
  job: GenerationJobDetailDto | null = null;
  records: GenerationJobRecord[] = [];
  loading = true;
  error: string | null = null;
  loadingBestPdb = false;
  loadingFasta = false;
  loadingRecordPdbN: number | null = null;
  loadingCsv = false;

  /** Per-metric stats: min, max, promedio (mean), media (median), desvEst (std dev), varianza */
  get metricStats(): {
    count: number;
    mpnn: MetricStats;
    plddt: MetricStats;
    ptm: MetricStats;
    pae: MetricStats;
    iPae: MetricStats;
    rmsd: MetricStats;
  } {
    const r = this.records;
    const empty: MetricStats = { min: null, max: null, promedio: null, media: null, desvEst: null, varianza: null };
    if (r.length === 0) {
      return { count: 0, mpnn: { ...empty }, plddt: { ...empty }, ptm: { ...empty }, pae: { ...empty }, iPae: { ...empty }, rmsd: { ...empty } };
    }
    const num = (v: unknown): number | null => {
      if (typeof v === 'number' && !Number.isNaN(v)) return v;
      if (typeof v === 'string') { const n = parseFloat(v); return !Number.isNaN(n) ? n : null; }
      return null;
    };
    const mpnnVals = r.map((x) => num(x.mpnn)).filter((v): v is number => v !== null);
    const plddtVals = r.map((x) => num(x.plddt)).filter((v): v is number => v !== null);
    const ptmVals = r.map((x) => num(x.ptm)).filter((v): v is number => v !== null);
    const paeVals = r.map((x) => num(x.pae)).filter((v): v is number => v !== null);
    const iPaeVals = r.map((x) => num(x.iPae)).filter((v): v is number => v !== null);
    const rmsdVals = r.map((x) => num(x.rmsd)).filter((v): v is number => v !== null);
    return {
      count: r.length,
      mpnn: computeMetricStats(mpnnVals),
      plddt: computeMetricStats(plddtVals),
      ptm: computeMetricStats(ptmVals),
      pae: computeMetricStats(paeVals),
      iPae: computeMetricStats(iPaeVals),
      rmsd: computeMetricStats(rmsdVals),
    };
  }

  /** For template: list of metric cards (label + stats). */
  get metricCards(): { key: string; label: string; stats: MetricStats }[] {
    const s = this.metricStats;
    return [
      { key: 'mpnn', label: 'MPNN', stats: s.mpnn },
      { key: 'plddt', label: 'pLDDT', stats: s.plddt },
      { key: 'ptm', label: 'pTM', stats: s.ptm },
      { key: 'pae', label: 'PAE', stats: s.pae },
      { key: 'iPae', label: 'iPAE', stats: s.iPae },
      { key: 'rmsd', label: 'RMSD', stats: s.rmsd },
    ];
  }

  ngOnInit(): void {
    const pid = this.route.snapshot.paramMap.get('projectId');
    const jid = this.route.snapshot.paramMap.get('jobId');
    if (pid && jid) {
      this.projectId = Number(pid);
      this.jobId = Number(jid);
      this.load();
    } else {
      this.loading = false;
      this.error = 'Faltan el ID del proyecto o del job.';
    }
  }

  load(): void {
    if (this.projectId == null || this.jobId == null) return;
    this.loading = true;
    this.projectService.getGenerationJob(this.projectId, this.jobId).subscribe({
      next: (job) => {
        this.job = job;
        this.loadRecords();
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load job.';
        this.loading = false;
      },
    });
  }

  loadRecords(): void {
    if (this.projectId == null || this.jobId == null) return;
    // Request a large page size so all records are returned (backend default is 50)
    this.projectService.getGenerationJobRecords(this.projectId, this.jobId, { size: 10000 }).subscribe({
      next: (list) => {
        this.records = list;
      },
      error: () => {},
    });
  }

  downloadCsv(): void {
    if (this.projectId == null || this.jobId == null || !this.job) return;
    this.loadingCsv = true;
    this.projectService.getGenerationJobRecordsCsv(this.projectId, this.jobId).subscribe({
      next: (csv) => {
        this.loadingCsv = false;
        if (!csv.trim()) return;
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `job-${this.job?.runId ?? this.job?.id}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: () => { this.loadingCsv = false; },
    });
  }

  downloadFasta(): void {
    if (this.projectId == null || this.jobId == null || !this.job) return;
    this.loadingFasta = true;
    this.projectService.getGenerationJobFasta(this.projectId, this.jobId).subscribe({
      next: (fasta) => {
        this.loadingFasta = false;
        if (!fasta?.trim()) return;
        const blob = new Blob([fasta], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `job-${this.job?.runId ?? this.job?.id}.fasta`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: () => { this.loadingFasta = false; },
    });
  }

  openFastaModal(): void {
    if (this.projectId == null || this.jobId == null) return;
    this.loadingFasta = true;
    this.projectService.getGenerationJobFasta(this.projectId, this.jobId).subscribe({
      next: (fasta) => {
        this.loadingFasta = false;
        const modalRef = this.modalService.open(PdbContentModal, { fullscreen: true, scrollable: true });
        const instance = modalRef.componentInstance as PdbContentModal;
        instance.pdbContent = fasta ?? '';
        instance.title = 'FASTA';
        instance.showViewer = false;
        instance.downloadExtension = 'fasta';
      },
      error: () => { this.loadingFasta = false; },
    });
  }

  openPdbModal(content: string | undefined, title: string): void {
    const modalRef = this.modalService.open(PdbContentModal, {
      fullscreen: true,
      scrollable: true,
    });
    (modalRef.componentInstance as PdbContentModal).pdbContent = content ?? '';
    (modalRef.componentInstance as PdbContentModal).title = title;
  }

  /** Fetches best PDB from API and opens modal. */
  openBestPdbModal(): void {
    if (this.projectId == null || this.jobId == null) return;
    this.loadingBestPdb = true;
    this.projectService.getGenerationJobBestPdb(this.projectId, this.jobId).subscribe({
      next: (content) => {
        this.loadingBestPdb = false;
        const modalRef = this.modalService.open(PdbContentModal, { fullscreen: true, scrollable: true });
        const instance = modalRef.componentInstance as PdbContentModal;
        instance.pdbContent = content ?? '';
        instance.title = 'Ver mejor PDB';
        instance.showViewer = true;
        instance.downloadExtension = 'pdb';
      },
      error: () => { this.loadingBestPdb = false; },
    });
  }

  /** Fetches record PDB from API and opens modal. */
  openRecordPdbModal(rec: GenerationJobRecord): void {
    if (this.projectId == null || this.jobId == null) return;
    this.loadingRecordPdbN = rec.n;
    this.projectService.getGenerationJobRecordPdb(this.projectId, this.jobId, rec.n).subscribe({
      next: (content) => {
        this.loadingRecordPdbN = null;
        this.openPdbModal(content ?? '', 'Record ' + rec.n);
      },
      error: () => { this.loadingRecordPdbN = null; },
    });
  }
}

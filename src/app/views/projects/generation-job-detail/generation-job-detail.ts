import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService, type GenerationJob, type GenerationJobRecord } from '@core/services/project.service';
import { PdbContentModal } from '../project-detail/components/pdb-content-modal/pdb-content-modal';

@Component({
  selector: 'app-generation-job-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './generation-job-detail.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GenerationJobDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private modalService = inject(NgbModal);
  private projectService = inject(ProjectService);

  projectId: number | null = null;
  jobId: number | null = null;
  job: GenerationJob | null = null;
  records: GenerationJobRecord[] = [];
  loading = true;
  error: string | null = null;

  /** Computed stats from records */
  get stats(): { count: number; meanPlddt: number | null; meanPtm: number | null; meanRmsd: number | null } {
    const r = this.records;
    if (r.length === 0) {
      return { count: 0, meanPlddt: null, meanPtm: null, meanRmsd: null };
    }
    const sum = (arr: GenerationJobRecord[], get: (x: GenerationJobRecord) => number | null | undefined) => {
      const vals = arr.map(get).filter((v): v is number => typeof v === 'number');
      return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
    };
    return {
      count: r.length,
      meanPlddt: sum(r, (x) => x.plddt),
      meanPtm: sum(r, (x) => x.ptm),
      meanRmsd: sum(r, (x) => x.rmsd),
    };
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
      this.error = 'Project or job ID missing.';
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
    this.projectService.getGenerationJobRecords(this.projectId, this.jobId).subscribe({
      next: (list) => {
        this.records = list;
      },
      error: () => {},
    });
  }

  downloadCsv(): void {
    if (this.projectId == null || this.jobId == null || !this.job) return;
    this.projectService.getGenerationJobRecordsCsv(this.projectId, this.jobId).subscribe({
      next: (csv) => {
        if (!csv.trim()) return;
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `job-${this.job?.runId ?? this.job?.id}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: () => {},
    });
  }

  downloadFasta(): void {
    const fasta = this.job?.fasta ?? '';
    if (!fasta.trim()) return;
    const blob = new Blob([fasta], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-${this.job?.runId ?? this.job?.id}.fasta`;
    a.click();
    URL.revokeObjectURL(url);
  }

  openFastaModal(): void {
    const modalRef = this.modalService.open(PdbContentModal, {
      fullscreen: true,
      scrollable: true,
    });
    const instance = modalRef.componentInstance as PdbContentModal;
    instance.pdbContent = this.job?.fasta ?? '';
    instance.title = 'FASTA';
    instance.showViewer = false;
    instance.downloadExtension = 'fasta';
  }

  openPdbModal(content: string | undefined, title: string): void {
    const modalRef = this.modalService.open(PdbContentModal, {
      fullscreen: true,
      scrollable: true,
    });
    (modalRef.componentInstance as PdbContentModal).pdbContent = content ?? '';
    (modalRef.componentInstance as PdbContentModal).title = title;
  }
}

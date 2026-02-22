import { Component, OnInit, OnDestroy, inject, CUSTOM_ELEMENTS_SCHEMA, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalRef, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { ProjectService, type Project, type Backbone, type GenerationJob } from '@core/services/project.service';
import { AddBackboneModal } from './components/add-backbone-modal/add-backbone-modal';
import { AddGenerationJobModal } from './components/add-generation-job-modal/add-generation-job-modal';
import { PdbViewerComponent } from './components/pdb-viewer/pdb-viewer';
import { PdbContentModal } from './components/pdb-content-modal/pdb-content-modal';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const POLL_INTERVAL_MS = 60_000; // 1 minute

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, PdbViewerComponent, NgbCollapseModule, RouterLink],
  templateUrl: './project-detail.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectDetail implements OnInit, OnDestroy {
  @ViewChild('confirmDeleteBackboneTpl') confirmDeleteBackboneTpl!: TemplateRef<unknown>;
  @ViewChild('confirmDeleteJobTpl') confirmDeleteJobTpl!: TemplateRef<unknown>;
  @ViewChild('jobErrorModalTpl') jobErrorModalTpl!: TemplateRef<unknown>;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private modalService = inject(NgbModal);
  private projectService = inject(ProjectService);
  private toastr = inject(ToastrService);

  project: Project | null = null;
  backbones: Backbone[] = [];
  generationJobs: GenerationJob[] = [];
  loading = true;
  error: string | null = null;

  /** Project details card: false = expanded (content visible), true = collapsed (header only) */
  projectDetailsCollapsed = false;
  /** Backbones section: false = expanded, true = collapsed */
  backbonesSectionCollapsed = false;
  /** Generación de datos sintéticos section: false = expanded, true = collapsed */
  generationJobsSectionCollapsed = false;

  /** Selected generation job IDs (only completed runs can be selected). */
  selectedJobIds: number[] = [];

  private statusPollTimer: ReturnType<typeof setInterval> | null = null;
  private generationJobPollTimer: ReturnType<typeof setInterval> | null = null;
  private projectId: number | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectId = Number(id);
      this.loadProject(this.projectId);
      this.loadBackbones(this.projectId);
      this.loadGenerationJobs(this.projectId);
      this.startStatusPolling();
      this.startGenerationJobPolling();
    } else {
      this.loading = false;
      this.error = 'Project ID missing.';
    }
  }

  ngOnDestroy(): void {
    this.stopStatusPolling();
    this.stopGenerationJobPolling();
  }

  loadProject(id: number): void {
    this.projectService.getProject(id).subscribe({
      next: (p) => {
        this.project = p;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load project.';
        this.loading = false;
      },
    });
  }

  loadBackbones(projectId: number): void {
    this.projectService.getBackbones(projectId).subscribe({
      next: (list) => {
        this.backbones = list;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load backbones.';
      },
    });
  }

  loadGenerationJobs(projectId: number): void {
    this.projectService.getGenerationJobs(projectId).subscribe({
      next: (list) => {
        this.generationJobs = list;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load generation jobs.';
      },
    });
  }

  isJobSelected(job: GenerationJob): boolean {
    return this.selectedJobIds.includes(job.id);
  }

  canSelectJob(job: GenerationJob): boolean {
    return job.status === 'COMPLETED';
  }

  toggleJobSelection(job: GenerationJob): void {
    if (!this.canSelectJob(job)) return;
    const idx = this.selectedJobIds.indexOf(job.id);
    if (idx === -1) {
      this.selectedJobIds = [...this.selectedJobIds, job.id];
    } else {
      this.selectedJobIds = this.selectedJobIds.filter((id) => id !== job.id);
    }
  }

  get completedJobs(): GenerationJob[] {
    return this.generationJobs.filter((j) => j.status === 'COMPLETED');
  }

  get allCompletedSelected(): boolean {
    const completed = this.completedJobs;
    return completed.length > 0 && completed.every((j) => this.selectedJobIds.includes(j.id));
  }

  toggleSelectAllCompleted(): void {
    if (this.allCompletedSelected) {
      this.selectedJobIds = [];
    } else {
      this.selectedJobIds = this.completedJobs.map((j) => j.id);
    }
  }

  /** Completed backbones for the add-generation-job modal. */
  get completedBackbones(): Backbone[] {
    return this.backbones.filter((bb) => bb.status === 'COMPLETED');
  }

  private getRunningGenerationJobRunIds(): string[] {
    const runIds = new Set<string>();
    for (const j of this.generationJobs) {
      if (j.runId && j.status === 'RUNNING') {
        runIds.add(j.runId);
      }
    }
    return Array.from(runIds);
  }

  private startGenerationJobPolling(): void {
    if (this.generationJobPollTimer != null) return;
    if (this.projectId == null) return;
    this.generationJobPollTimer = setInterval(() => {
      if (this.projectId == null) return;
      const runIds = this.getRunningGenerationJobRunIds();
      if (runIds.length === 0) return;
      forkJoin(
        runIds.map((runId) => this.projectService.checkGenerationJobStatus(this.projectId!, runId))
      ).subscribe({
        next: () => this.loadGenerationJobs(this.projectId!),
        error: () => this.loadGenerationJobs(this.projectId!),
      });
    }, POLL_INTERVAL_MS);
  }

  private stopGenerationJobPolling(): void {
    if (this.generationJobPollTimer != null) {
      clearInterval(this.generationJobPollTimer);
      this.generationJobPollTimer = null;
    }
  }

  /** Distinct runIDs that have at least one backbone in RUNNING state. */
  private getRunningRunIds(): string[] {
    const runIds = new Set<string>();
    for (const bb of this.backbones) {
      if (bb.runID && bb.status === 'RUNNING') {
        runIds.add(bb.runID);
      }
    }
    return Array.from(runIds);
  }

  /**
   * Start a timer that runs every minute while the user is on this screen.
   * Each minute: if any backbone has status RUNNING, call the status endpoint for those runs and refresh backbones.
   * If none are RUNNING, do nothing. Timer never stops until the user leaves (ngOnDestroy).
   */
  private startStatusPolling(): void {
    if (this.statusPollTimer != null) return;
    if (this.projectId == null) return;

    this.statusPollTimer = setInterval(() => {
      if (this.projectId == null) return;
      const runIds = this.getRunningRunIds();
      if (runIds.length === 0) return;

      forkJoin(
        runIds.map((runId) => this.projectService.checkRunStatus(this.projectId!, runId))
      ).subscribe({
        next: () => this.loadBackbones(this.projectId!),
        error: () => this.loadBackbones(this.projectId!),
      });
    }, POLL_INTERVAL_MS);
  }

  private stopStatusPolling(): void {
    if (this.statusPollTimer != null) {
      clearInterval(this.statusPollTimer);
      this.statusPollTimer = null;
    }
  }

  openAddBackboneModal(): void {
    if (!this.project) return;
    const modalRef = this.modalService.open(AddBackboneModal, {
      size: 'lg',
      backdrop: 'static',
    });
    (modalRef.componentInstance as AddBackboneModal).projectId = this.project.id;
    modalRef.closed.subscribe(() => {
      this.loadBackbones(this.project!.id);
    });
  }

  openAddGenerationJobModal(): void {
    if (!this.project) return;
    const modalRef = this.modalService.open(AddGenerationJobModal, {
      size: 'md',
      backdrop: 'static',
    });
    (modalRef.componentInstance as AddGenerationJobModal).projectId = this.project.id;
    (modalRef.componentInstance as AddGenerationJobModal).completedBackbones = this.completedBackbones;
    modalRef.closed.subscribe(() => {
      this.loadGenerationJobs(this.project!.id);
    });
  }

  /** Same column order as single-job CSV: mpnn,plddt,ptm,i_ptm,pae,i_pae,rmsd,seq. */
  private static readonly CSV_HEADER = 'mpnn,plddt,ptm,i_ptm,pae,i_pae,rmsd,seq';

  /** Navigate to metrics compare page with selected job IDs. */
  navigateToCompare(): void {
    if (!this.project || this.selectedJobIds.length < 2) return;
    const jobIds = this.selectedJobIds.join(',');
    this.router.navigate(['/projects/detail', this.project.id, 'compare'], { queryParams: { jobIds } });
  }

  /** Fetch CSVs for selected runs and download one consolidated file (same columns as single-job CSV). */
  consolidateCsv(): void {
    if (!this.project || this.selectedJobIds.length === 0) return;
    const selectedJobs = this.generationJobs.filter((j) => this.selectedJobIds.includes(j.id));
    if (selectedJobs.length === 0) return;
    const projectId = this.project.id;
    forkJoin(
      selectedJobs.map((job) =>
        this.projectService.getGenerationJobRecordsCsv(projectId, job.id).pipe(
          catchError(() => of('')),
        )
      )
    ).subscribe({
      next: (csvs: string[]) => {
        const lines: string[] = [];
        lines.push(ProjectDetail.CSV_HEADER);
        selectedJobs.forEach((job, i) => {
          const csv = (csvs[i] ?? '').trim();
          const parts = csv.split(/\r?\n/).filter((line) => line.length > 0);
          if (parts.length < 2) return;
          const dataRows = parts.slice(1);
          dataRows.forEach((row) => lines.push(row));
        });
        if (lines.length <= 1) return;
        const content = lines.join('\n');
        const blob = new Blob([content], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `consolidated-${this.project?.name ?? 'project'}-${Date.now()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: () => {},
    });
  }

  downloadCsv(job: GenerationJob): void {
    if (!this.project) return;
    this.projectService.getGenerationJobRecordsCsv(this.project.id, job.id).subscribe({
      next: (csv) => {
        if (!csv.trim()) return;
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `job-${job.runId ?? job.id}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: () => {},
    });
  }

  downloadFasta(job: GenerationJob): void {
    const fasta = job.fasta ?? '';
    if (!fasta.trim()) return;
    const blob = new Blob([fasta], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-${job.runId ?? job.id}.fasta`;
    a.click();
    URL.revokeObjectURL(url);
  }

  openPdbModal(content: string | undefined, title: string): void {
    const modalRef = this.modalService.open(PdbContentModal, {
      fullscreen: true,
      scrollable: true,
    });
    (modalRef.componentInstance as PdbContentModal).pdbContent = content ?? '';
    (modalRef.componentInstance as PdbContentModal).title = title;
  }

  backboneToDelete: Backbone | null = null;
  private deleteBackboneModalRef: NgbModalRef | null = null;
  jobToDelete: GenerationJob | null = null;
  private deleteJobModalRef: NgbModalRef | null = null;
  jobErrorForModal: GenerationJob | null = null;
  private jobErrorModalRef: NgbModalRef | null = null;

  openConfirmDeleteBackbone(bb: Backbone): void {
    this.backboneToDelete = bb;
    this.deleteBackboneModalRef = this.modalService.open(this.confirmDeleteBackboneTpl, {
      backdrop: 'static',
      size: 'sm',
    });
  }

  confirmDeleteBackbone(): void {
    const bb = this.backboneToDelete;
    if (!bb || !this.projectId) {
      this.deleteBackboneModalRef?.close();
      this.deleteBackboneModalRef = null;
      return;
    }
    this.projectService.deleteBackbone(this.projectId, bb.id).subscribe({
      next: () => {
        this.toastr.success('Backbone deleted.');
        this.backboneToDelete = null;
        this.deleteBackboneModalRef?.close();
        this.deleteBackboneModalRef = null;
        this.loadBackbones(this.projectId!);
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || err?.message || 'Failed to delete backbone.');
      },
    });
  }

  cancelDeleteBackbone(): void {
    this.backboneToDelete = null;
    this.deleteBackboneModalRef?.dismiss();
    this.deleteBackboneModalRef = null;
  }

  openConfirmDeleteJob(job: GenerationJob): void {
    this.jobToDelete = job;
    this.deleteJobModalRef = this.modalService.open(this.confirmDeleteJobTpl, {
      backdrop: 'static',
      size: 'sm',
    });
  }

  confirmDeleteJob(): void {
    const job = this.jobToDelete;
    if (!job || !this.projectId) {
      this.deleteJobModalRef?.close();
      this.deleteJobModalRef = null;
      return;
    }
    this.projectService.deleteGenerationJob(this.projectId, job.id).subscribe({
      next: () => {
        this.toastr.success('Job deleted.');
        this.jobToDelete = null;
        this.deleteJobModalRef?.close();
        this.deleteJobModalRef = null;
        this.loadGenerationJobs(this.projectId!);
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || err?.message || 'Failed to delete job.');
      },
    });
  }

  cancelDeleteJob(): void {
    this.jobToDelete = null;
    this.deleteJobModalRef?.dismiss();
    this.deleteJobModalRef = null;
  }

  openJobErrorModal(job: GenerationJob): void {
    this.jobErrorForModal = job;
    this.jobErrorModalRef = this.modalService.open(this.jobErrorModalTpl, {
      backdrop: true,
      size: 'md',
    });
    this.jobErrorModalRef.dismissed.subscribe(() => {
      this.jobErrorForModal = null;
      this.jobErrorModalRef = null;
    });
  }

  closeJobErrorModal(): void {
    this.jobErrorModalRef?.dismiss();
    this.jobErrorForModal = null;
    this.jobErrorModalRef = null;
  }
}

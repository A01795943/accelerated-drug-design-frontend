import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@environment/environment';

export interface Project {
  id: number;
  name: string;
  description?: string;
  target?: string;
  complex?: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  targetDownloadFromWeb: boolean;
  targetName?: string;
  target?: string;
  complexDownloadFromWeb: boolean;
  complexName?: string;
  complex?: string;
}

export interface Backbone {
  id: number;
  name: string;
  runID?: string;
  status?: string;
  error?: string;
  iterations?: number;
  contigs?: string;
  hotspots?: string;
  chainsToRemove?: string;
  structure?: string;
}

export interface CreateBackbonesRequest {
  contigs?: string;
  hotspots?: string;
  chainsToRemove?: string;
  count: number;
  iterations?: number;
}

export interface GenerationJob {
  id: number;
  runId?: string;
  status?: string;
  error?: string;
  temperature?: number;
  numSeqs?: number;
  outputCsv?: string;
  fasta?: string;
  /** Best PDB content (from generation_jobs.best_pdb). */
  bestPdb?: string;
  /** Backbone id (from API when backbone is loaded). */
  backboneId?: number;
  /** Backbone name (from API when backbone is loaded). */
  backboneName?: string;
  backbone?: Backbone;
  /** Create datetime (ISO-8601 from API). */
  createdAt?: string;
  /** Completed datetime (ISO-8601 from API). */
  completedAt?: string;
}

export interface GenerationJobRecord {
  generationJobId: number;
  n: number;
  seq?: string;
  mpnn?: string;
  plddt?: number;
  ptm?: number;
  iPtm?: number;
  pae?: string;
  iPae?: string;
  rmsd?: number;
  pdb?: string;
}

export interface CreateGenerationJobRequest {
  backboneId: number;
  temperature?: number;
  numSeqs: number;
}

/** API response for GET generation-jobs/:jobId/records (paginated) */
export interface RecordsPageResponse {
  records: GenerationJobRecord[];
  totalRecords: number;
  totalBatches: number;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/projects`;
  private readonly generateUrl = `${environment.apiUrl}/api/generate`;

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  createProject(request: CreateProjectRequest): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, request);
  }

  getBackbones(projectId: number): Observable<Backbone[]> {
    return this.http.get<Backbone[]>(`${this.apiUrl}/${projectId}/backbones`);
  }

  /** Check run status with core system and update backbones in DB. Returns updated list. */
  checkRunStatus(projectId: number, runId: string): Observable<Backbone[]> {
    return this.http.get<Backbone[]>(`${this.apiUrl}/${projectId}/backbones/status/${encodeURIComponent(runId)}`);
  }

  createBackbones(projectId: number, request: CreateBackbonesRequest): Observable<Backbone[]> {
    return this.http.post<Backbone[]>(`${this.apiUrl}/${projectId}/backbones`, request);
  }

  deleteBackbone(projectId: number, backboneId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}/backbones/${backboneId}`);
  }

  generateContigs(): Observable<string> {
    return this.http.get(this.generateUrl + '/contigs', { responseType: 'text' });
  }

  generateHotspots(): Observable<string> {
    return this.http.get(this.generateUrl + '/hotspots', { responseType: 'text' });
  }

  generateChainsToRemove(): Observable<string> {
    return this.http.get(this.generateUrl + '/chains-to-remove', { responseType: 'text' });
  }

  getGenerationJobs(projectId: number): Observable<GenerationJob[]> {
    return this.http.get<GenerationJob[]>(`${this.apiUrl}/${projectId}/generation-jobs`);
  }

  getGenerationJob(projectId: number, jobId: number): Observable<GenerationJob> {
    return this.http.get<GenerationJob>(`${this.apiUrl}/${projectId}/generation-jobs/${jobId}`);
  }

  /**
   * Fetches records for a generation job. Use options.size to request more than the default 50 (e.g. size: 10000 to load all).
   */
  getGenerationJobRecords(
    projectId: number,
    jobId: number,
    options?: { batch?: number; size?: number }
  ): Observable<GenerationJobRecord[]> {
    let params = new HttpParams();
    if (options?.batch != null) params = params.set('batch', String(options.batch));
    if (options?.size != null) params = params.set('size', String(options.size));
    const url = `${this.apiUrl}/${projectId}/generation-jobs/${jobId}/records`;
    const req = params.keys().length ? this.http.get<RecordsPageResponse>(url, { params }) : this.http.get<RecordsPageResponse>(url);
    return req.pipe(map((res) => res?.records ?? []));
  }

  /** Fetches CSV built from generation_jobs_records (excludes pdb, generation_job_id, n). */
  getGenerationJobRecordsCsv(projectId: number, jobId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${projectId}/generation-jobs/${jobId}/records/csv`, {
      responseType: 'text',
    });
  }

  createGenerationJob(projectId: number, request: CreateGenerationJobRequest): Observable<GenerationJob> {
    return this.http.post<GenerationJob>(`${this.apiUrl}/${projectId}/generation-jobs`, request);
  }

  checkGenerationJobStatus(projectId: number, runId: string): Observable<GenerationJob> {
    return this.http.get<GenerationJob>(`${this.apiUrl}/${projectId}/generation-jobs/status/${encodeURIComponent(runId)}`);
  }

  deleteGenerationJob(projectId: number, jobId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}/generation-jobs/${jobId}`);
  }
}

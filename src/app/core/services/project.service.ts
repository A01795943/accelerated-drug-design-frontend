import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@environment/environment';

/** Resumen de proyecto (detalle rápido sin target/complex). */
export interface ProjectSummaryDto {
  id: number;
  name: string;
  description?: string;
}

export interface Project extends ProjectSummaryDto {
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
  bestPdb?: string;
  backboneId?: number;
  backboneName?: string;
  backbone?: Backbone;
  createdAt?: string;
  completedAt?: string;
}

/** Detalle de job para pantalla (sin bestPdb, fasta; se obtienen por endpoints separados). */
export interface GenerationJobDetailDto {
  id: number;
  runId?: string;
  status?: string;
  error?: string;
  totalRecords?: number;
  backboneId?: number;
  backboneName?: string;
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

/** EDA: distribution (histogram) response */
export interface DistributionResponse {
  columnName: string;
  values: number[];
  min: number | null;
  max: number | null;
}

/** EDA: bins request body */
export interface BinsRequest {
  bins: number[];
  labels: string[];
}

/** EDA: bins response */
export interface BinsResponse {
  columnName: string;
  labels: string[];
  counts: number[];
  percentages: number[];
}

/** EDA: descriptive statistics for one metric */
export interface DescriptiveStatsDto {
  mean: number | null;
  std: number | null;
  min: number | null;
  p25: number | null;
  p50: number | null;
  p75: number | null;
  max: number | null;
  skew: number | null;
  kurtosis: number | null;
}

/** EDA: descriptive stats response (metric key -> stats) */
export type DescriptiveStatsResponse = Record<string, DescriptiveStatsDto>;

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/projects`;
  private readonly generateUrl = `${environment.apiUrl}/api/generate`;

  getProjects(): Observable<ProjectSummaryDto[]> {
    return this.http.get<ProjectSummaryDto[]>(this.apiUrl);
  }

  getProject(id: number): Observable<ProjectSummaryDto> {
    return this.http.get<ProjectSummaryDto>(`${this.apiUrl}/${id}`);
  }

  getProjectTarget(projectId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${projectId}/target`, { responseType: 'text' });
  }

  getProjectComplex(projectId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${projectId}/complex`, { responseType: 'text' });
  }

  createProject(request: CreateProjectRequest): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, request);
  }

  getBackbones(projectId: number): Observable<Backbone[]> {
    return this.http.get<Backbone[]>(`${this.apiUrl}/${projectId}/backbones`);
  }

  /** PDB structure of a backbone (text/plain). */
  getBackboneStructure(projectId: number, backboneId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${projectId}/backbones/${backboneId}/structure`, { responseType: 'text' });
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

  generateContigs(projectId: number): Observable<string> {
    return this.http.get(this.generateUrl + '/contigs', { params: { projectId }, responseType: 'text' });
  }

  generateHotspots(projectId: number): Observable<string> {
    return this.http.get(this.generateUrl + '/hotspots', { params: { projectId }, responseType: 'text' });
  }

  generateChainsToRemove(projectId: number): Observable<string> {
    return this.http.get(this.generateUrl + '/chains-to-remove', { params: { projectId }, responseType: 'text' });
  }

  getGenerationJobs(projectId: number): Observable<GenerationJob[]> {
    return this.http.get<GenerationJob[]>(`${this.apiUrl}/${projectId}/generation-jobs`);
  }

  getGenerationJob(projectId: number, jobId: number): Observable<GenerationJobDetailDto> {
    return this.http.get<GenerationJobDetailDto>(`${this.apiUrl}/${projectId}/generation-jobs/${jobId}`);
  }

  getGenerationJobBestPdb(projectId: number, jobId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${projectId}/generation-jobs/${jobId}/best-pdb`, { responseType: 'text' });
  }

  getGenerationJobFasta(projectId: number, jobId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${projectId}/generation-jobs/${jobId}/fasta`, { responseType: 'text' });
  }

  getGenerationJobRecordPdb(projectId: number, jobId: number, n: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${projectId}/generation-jobs/${jobId}/records/${n}/pdb`, { responseType: 'text' });
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

  /** EDA: descriptive statistics (mean, std, min, percentiles, max, skew, kurtosis) for all metrics. */
  getEdaDescriptiveStats(projectId: number, jobId: number): Observable<DescriptiveStatsResponse> {
    return this.http.get<DescriptiveStatsResponse>(
      `${this.apiUrl}/${projectId}/generation-jobs/${jobId}/eda/descriptive-stats`
    );
  }

  /** EDA: distribution data for a metric (values, min, max). */
  getEdaDistribution(projectId: number, jobId: number, metric: string): Observable<DistributionResponse> {
    return this.http.get<DistributionResponse>(
      `${this.apiUrl}/${projectId}/generation-jobs/${jobId}/eda/distribution`,
      { params: { metric } }
    );
  }

  /** EDA: bins analysis for a metric. */
  getEdaBins(
    projectId: number,
    jobId: number,
    metric: string,
    request: BinsRequest
  ): Observable<BinsResponse> {
    return this.http.post<BinsResponse>(
      `${this.apiUrl}/${projectId}/generation-jobs/${jobId}/eda/bins`,
      request,
      { params: { metric } }
    );
  }
}

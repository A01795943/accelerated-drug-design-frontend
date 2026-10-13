import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

export type CoreInstanceHealthState = 'UP' | 'DOWN' | 'UNKNOWN';

export interface CoreInstanceWindow {
  id?: number;
  dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  startTime: string;
  endTime: string;
}

export interface CoreInstance {
  id: number;
  name: string;
  baseUrl: string;
  enabled: boolean;
  restrictSchedule: boolean;
  maxJobMinutes?: number | null;
  connectTimeoutMs?: number | null;
  readTimeoutMs?: number | null;
  healthState: CoreInstanceHealthState;
  lastHealthAt?: string;
  currentRunId?: string | null;
  currentRunKind?: string | null;
  claimedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  windows: CoreInstanceWindow[];
}

export interface CoreInstanceCreate {
  name: string;
  baseUrl: string;
  enabled?: boolean;
  restrictSchedule?: boolean;
  maxJobMinutes?: number | null;
  connectTimeoutMs?: number | null;
  readTimeoutMs?: number | null;
  windows?: CoreInstanceWindow[];
}

export interface CoreInstancePatch {
  name?: string;
  baseUrl?: string;
  enabled?: boolean;
  restrictSchedule?: boolean;
  maxJobMinutes?: number | null;
  connectTimeoutMs?: number | null;
  readTimeoutMs?: number | null;
  windows?: CoreInstanceWindow[];
}

@Injectable({ providedIn: 'root' })
export class CoreInstanceService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/core-instances`;

  list(): Observable<CoreInstance[]> {
    return this.http.get<CoreInstance[]>(this.apiUrl);
  }

  get(id: number): Observable<CoreInstance> {
    return this.http.get<CoreInstance>(`${this.apiUrl}/${id}`);
  }

  create(payload: CoreInstanceCreate): Observable<CoreInstance> {
    return this.http.post<CoreInstance>(this.apiUrl, payload);
  }

  patch(id: number, partial: CoreInstancePatch): Observable<CoreInstance> {
    return this.http.patch<CoreInstance>(`${this.apiUrl}/${id}`, partial);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

export type CoreLoadStatus = 'AVAILABLE' | 'OVERLOADED' | 'UNAVAILABLE' | string;

export interface CoreAdminInstance {
  id: number;
  name: string;
  baseUrl: string;
  enabled: boolean;
  status: CoreLoadStatus;
  statusReason?: string | null;
  maxConcurrentRuns: number;
  inFlightMinibatches: number;
  healthState?: string | null;
  currentRunId?: string | null;
  lastMetricsAt?: string | null;
  lastMetricsJson?: string | null;
  inFlightTotal: number;
  occupancy: 'FREE' | 'IN_USE' | 'FULL' | string;
  runningMinibatches: RunningMinibatch[];
  otherRun?: { kind: string; runId: string } | null;
  gpuDataAvailable: boolean;
  gpus: GpuReading[];
}

export interface RunningMinibatch {
  generationJobId: number;
  minibatchId: number;
  idx: number;
  nOffset: number;
  numSeqs: number;
  temperature?: number | null;
  backboneId?: number | null;
  backboneName?: string | null;
  projectId?: number | null;
  startedAt?: string | null;
}

export interface GpuReading {
  index?: number | null;
  name?: string | null;
  utilPercent?: number | null;
  memUsedMb?: number | null;
  memTotalMb?: number | null;
  memPercent?: number | null;
  temperatureC?: number | null;
}

export interface LoadPolicy {
  cpuEnter: number;
  memoryEnter: number;
  gpuUtilEnter: number;
  gpuMemEnter: number;
  diskEnter: number;
  cpuRecover: number;
  memoryRecover: number;
  gpuUtilRecover: number;
  gpuMemRecover: number;
  diskRecover: number;
}

export interface CoreMetricSample {
  collectedAt: string;
  cpuPercent?: number | null;
  memPercent?: number | null;
  gpuUtilPercent?: number | null;
  gpuMemPercent?: number | null;
  diskPercent?: number | null;
  gpuMemUsedMb?: number | null;
  gpuMemTotalMb?: number | null;
}

export interface RegisterCoreRequest {
  name: string;
  baseUrl: string;
  maxConcurrentRuns?: number | null;
}

export interface PatchCoreAdminRequest {
  enabled?: boolean;
  maxConcurrentRuns?: number;
  baseUrl?: string;
}

/** Snapshot stored in {@link CoreAdminInstance.lastMetricsJson}. */
export interface CoreSystemMetricsSnapshot {
  cpu?: { percent?: number };
  memory?: { percent?: number };
  gpus?: {
    index?: number;
    name?: string;
    util_percent?: number;
    mem_used_mb?: number;
    mem_total_mb?: number;
    mem_percent?: number;
    temperature_c?: number;
  }[];
  disk?: { percent?: number };
  network?: { sent_per_sec?: number; recv_per_sec?: number };
}

@Injectable({ providedIn: 'root' })
export class CoreAdminService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/cores`;

  list(): Observable<CoreAdminInstance[]> {
    return this.http.get<CoreAdminInstance[]>(this.apiUrl);
  }

  register(payload: RegisterCoreRequest): Observable<CoreAdminInstance> {
    return this.http.post<CoreAdminInstance>(this.apiUrl, payload);
  }

  patch(id: number, partial: PatchCoreAdminRequest): Observable<CoreAdminInstance> {
    return this.http.patch<CoreAdminInstance>(`${this.apiUrl}/${id}`, partial);
  }

  refresh(id: number): Observable<CoreAdminInstance> {
    return this.http.post<CoreAdminInstance>(`${this.apiUrl}/${id}/refresh`, {});
  }

  loadPolicy(): Observable<LoadPolicy> {
    return this.http.get<LoadPolicy>(`${this.apiUrl}/load-policy`);
  }

  history(id: number, hours: number): Observable<CoreMetricSample[]> {
    return this.http.get<CoreMetricSample[]>(`${this.apiUrl}/${id}/metrics/history`, { params: { hours } });
  }
}

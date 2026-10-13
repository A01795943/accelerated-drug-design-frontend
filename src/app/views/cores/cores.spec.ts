import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import {
  CoreAdminService,
  CoreInstanceService,
  type CoreAdminInstance,
  type LoadPolicy,
} from '@core/services/core-instance.service';
import { CoresAdmin } from './cores';

describe('CoresAdmin', () => {
  let fixture: ComponentFixture<CoresAdmin>;

  const policy: LoadPolicy = {
    cpuEnter: 90,
    memoryEnter: 90,
    gpuUtilEnter: 95,
    gpuMemEnter: 90,
    diskEnter: 90,
    cpuRecover: 80,
    memoryRecover: 80,
    gpuUtilRecover: 80,
    gpuMemRecover: 80,
    diskRecover: 85,
  };

  const row: CoreAdminInstance = {
    id: 1,
    name: 'core-a',
    baseUrl: 'http://127.0.0.1:8000',
    enabled: true,
    status: 'OVERLOADED',
    statusReason: 'cpu',
    maxConcurrentRuns: 1,
    inFlightMinibatches: 1,
    inFlightTotal: 1,
    occupancy: 'FULL',
    healthState: 'UP',
    lastMetricsAt: '2026-10-08T18:00:00Z',
    lastMetricsJson: JSON.stringify({
      cpu: { percent: 91 },
      memory: { percent: 40 },
      disk: { percent: 55 },
    }),
    gpuDataAvailable: true,
    gpus: [{ index: 0, name: 'T4', utilPercent: 12, memUsedMb: 12288, memTotalMb: 16384, memPercent: 75 }],
    runningMinibatches: [
      {
        generationJobId: 9,
        minibatchId: 3,
        idx: 0,
        nOffset: 0,
        numSeqs: 100,
        temperature: 0.4,
        backboneName: 'bb-17',
        projectId: 4,
        startedAt: new Date(Date.now() - 5 * 60000).toISOString(),
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoresAdmin],
      providers: [
        provideRouter([]),
        {
          provide: CoreAdminService,
          useValue: {
            list: () => of([row]),
            loadPolicy: () => of(policy),
            patch: () => of({ ...row, enabled: false }),
            refresh: () => of(row),
            history: () => of([]),
          },
        },
        {
          provide: CoreInstanceService,
          useValue: {
            list: () => of([{ id: 1, name: 'core-a', baseUrl: row.baseUrl, enabled: true, restrictSchedule: false, healthState: 'UP', windows: [] }]),
            create: () => of({ id: 2 }),
            patch: () => of({ id: 1 }),
            delete: () => of(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoresAdmin);
    fixture.detectChanges();
  });

  it('shows occupancy, load and VRAM in gigabytes', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Llena 1/1');
    expect(text).toContain('Sobrecargada');
    expect(text).toContain('91 % · Alto');
    expect(text).toContain('12.0 GB de 16.0 GB (75 %)');
    expect(text).toContain('bb-17');
    expect(text).toContain('Job 9');
    expect(text).not.toContain('OVERLOADED');
  });
});

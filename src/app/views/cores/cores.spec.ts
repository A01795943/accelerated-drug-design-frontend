import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CoreAdminService, type CoreAdminInstance } from '@core/services/core-instance.service';
import { CoresAdmin } from './cores';

describe('CoresAdmin', () => {
  let fixture: ComponentFixture<CoresAdmin>;

  const row: CoreAdminInstance = {
    id: 1,
    name: 'core-a',
    baseUrl: 'http://127.0.0.1:8000',
    enabled: true,
    status: 'OVERLOADED',
    statusReason: 'cpu',
    maxConcurrentRuns: 1,
    inFlightMinibatches: 1,
    lastMetricsJson: JSON.stringify({
      cpu: { percent: 91 },
      memory: { percent: 40 },
      gpus: [{ util_percent: 12 }],
      disk: { percent: 55 },
      network: { sent_per_sec: 2048, recv_per_sec: 1024 },
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoresAdmin],
      providers: [
        {
          provide: CoreAdminService,
          useValue: {
            list: () => of([row]),
            patch: () => of({ ...row, enabled: false }),
            refresh: () => of(row),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoresAdmin);
    fixture.detectChanges();
  });

  it('shows status, reason, metrics and in-flight runs', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('OVERLOADED');
    expect(text).toContain('cpu');
    expect(text).toContain('91%');
    expect(text).toContain('40%');
    expect(text).toContain('12%');
    expect(text).toContain('55%');
    expect(text).toContain('2.0 KB/s');
    expect(text).toContain('1');
  });
});

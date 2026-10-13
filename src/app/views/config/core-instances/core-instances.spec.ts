import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { CoreAdminService, CoreInstanceService, type CoreAdminInstance, type LoadPolicy } from '@core/services/core-instance.service';
import { CoresAdmin } from '../../cores/cores';

describe('CoresAdmin administration', () => {
  let fixture: ComponentFixture<CoresAdmin>;
  let component: CoresAdmin;
  let pool: jasmine.SpyObj<CoreInstanceService>;

  const policy: LoadPolicy = {
    cpuEnter: 90, memoryEnter: 90, gpuUtilEnter: 95, gpuMemEnter: 90, diskEnter: 90,
    cpuRecover: 80, memoryRecover: 80, gpuUtilRecover: 80, gpuMemRecover: 80, diskRecover: 85,
  };
  const row: CoreAdminInstance = {
    id: 1,
    name: 'core-principal',
    baseUrl: 'http://localhost:8000',
    enabled: true,
    status: 'AVAILABLE',
    maxConcurrentRuns: 1,
    inFlightMinibatches: 0,
    inFlightTotal: 0,
    occupancy: 'FREE',
    gpuDataAvailable: false,
    gpus: [],
    runningMinibatches: [],
  };

  beforeEach(async () => {
    pool = jasmine.createSpyObj('CoreInstanceService', ['list', 'create', 'patch', 'delete']);
    pool.list.and.returnValue(of([{
      id: 1, name: 'core-principal', baseUrl: 'http://localhost:8000', enabled: true,
      restrictSchedule: false, healthState: 'UP', windows: [],
    }]));
    pool.patch.and.returnValue(of({
      id: 1, name: 'core-lab', baseUrl: 'http://localhost:8000', enabled: true,
      restrictSchedule: true, healthState: 'UP', windows: [],
    }));

    await TestBed.configureTestingModule({
      imports: [CoresAdmin],
      providers: [
        provideRouter([]),
        { provide: CoreInstanceService, useValue: pool },
        {
          provide: CoreAdminService,
          useValue: {
            list: () => of([row]),
            loadPolicy: () => of(policy),
            patch: () => of(row),
            refresh: () => of(row),
            history: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoresAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('lists a free instance', () => {
    expect(component.instances.length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('core-principal');
    expect(fixture.nativeElement.textContent).toContain('Libre');
    expect(fixture.nativeElement.textContent).toContain('sin datos de GPU');
    expect(fixture.nativeElement.textContent).toContain('No hay nada corriendo.');
  });

  it('hides the window editor until restrictSchedule is enabled', () => {
    component.openCreate();
    fixture.detectChanges();
    expect(component.restrictSchedule).toBeFalse();
    expect(fixture.nativeElement.textContent).not.toContain('Ventanas de disponibilidad');
    component.form.patchValue({ restrictSchedule: true });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Ventanas de disponibilidad');
  });

  it('maps 400 and 409 errors', () => {
    expect(component.formatApiError(new HttpErrorResponse({
      status: 400,
      error: { error: 'baseUrl host is not in the allowed private CIDR ranges' },
    }), 'fallback')).toContain('allowed private CIDR');
    expect(component.formatApiError(new HttpErrorResponse({
      status: 409,
      error: { error: 'Cannot delete instance while runs are in flight. Disable it (enabled=false) instead of deleting.' },
    }), 'fallback')).toContain('Disable it');
  });

  it('patches on edit', () => {
    component.openEdit(component.instances[0]);
    component.form.patchValue({ name: 'core-lab', restrictSchedule: true });
    component.submitForm();
    expect(pool.patch).toHaveBeenCalled();
    const [id, payload] = pool.patch.calls.mostRecent().args;
    expect(id).toBe(1);
    expect(payload.name).toBe('core-lab');
  });
});

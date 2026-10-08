import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { CoreInstances } from './core-instances';
import { CoreInstanceService, type CoreInstance } from '@core/services/core-instance.service';

describe('CoreInstances', () => {
  let fixture: ComponentFixture<CoreInstances>;
  let component: CoreInstances;
  let service: jasmine.SpyObj<CoreInstanceService>;

  const sample: CoreInstance = {
    id: 1,
    name: 'core-principal',
    baseUrl: 'http://localhost:8000',
    enabled: true,
    restrictSchedule: false,
    healthState: 'UP',
    currentRunId: null,
    windows: [],
  };

  beforeEach(async () => {
    service = jasmine.createSpyObj('CoreInstanceService', ['list', 'create', 'patch', 'delete']);
    service.list.and.returnValue(of([sample]));

    await TestBed.configureTestingModule({
      imports: [CoreInstances],
      providers: [{ provide: CoreInstanceService, useValue: service }],
    }).compileComponents();

    fixture = TestBed.createComponent(CoreInstances);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should list instances with health and occupancy', () => {
    expect(component.instances.length).toBe(1);
    const html = fixture.nativeElement as HTMLElement;
    expect(html.textContent).toContain('core-principal');
    expect(html.textContent).toContain('UP');
    expect(html.textContent).toContain('Libre');
  });

  it('hides the window editor until restrictSchedule is enabled', () => {
    component.openCreate();
    fixture.detectChanges();
    expect(component.restrictSchedule).toBeFalse();
    expect((fixture.nativeElement as HTMLElement).textContent).not.toContain('Ventanas de disponibilidad');

    component.form.patchValue({ restrictSchedule: true });
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Ventanas de disponibilidad');
  });

  it('maps 400 allowlist errors clearly', () => {
    const err = new HttpErrorResponse({
      status: 400,
      error: { error: 'baseUrl host is not in the allowed private CIDR ranges' },
    });
    expect(component.formatApiError(err, 'fallback')).toContain('allowed private CIDR');
  });

  it('maps 409 delete conflicts to disable guidance', () => {
    const err = new HttpErrorResponse({
      status: 409,
      error: { error: 'Cannot delete instance while a run is in progress. Disable it (enabled=false) instead of deleting.' },
    });
    expect(component.formatApiError(err, 'fallback')).toContain('Disable it');
  });

  it('patches on edit', () => {
    service.patch.and.returnValue(of({ ...sample, name: 'core-lab' }));
    component.openEdit(sample);
    component.form.patchValue({ name: 'core-lab', restrictSchedule: true });
    component.submitForm();
    expect(service.patch).toHaveBeenCalled();
    const [id, payload] = service.patch.calls.mostRecent().args;
    expect(id).toBe(1);
    expect(payload.name).toBe('core-lab');
    expect(payload.restrictSchedule).toBeTrue();
    expect(payload.windows?.length).toBeGreaterThan(0);
  });
});

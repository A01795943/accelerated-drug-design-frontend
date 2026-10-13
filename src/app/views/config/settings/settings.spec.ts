import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SettingsService, type AppSetting } from '@core/services/settings.service';
import { SettingsPage } from './settings';

describe('SettingsPage', () => {
  let fixture: ComponentFixture<SettingsPage>;
  let settings: jasmine.SpyObj<SettingsService>;

  const factor: AppSetting = {
    key: 'generation.max_attempt_factor',
    value: '20',
    defaultValue: '20',
    type: 'integer',
    min: 1,
    max: 1000,
    description: 'Veces que num_seqs puede intentar ProteinMPNN.',
    group: 'Generación',
    updatedAt: null,
    updatedBy: null,
  };

  beforeEach(async () => {
    settings = jasmine.createSpyObj('SettingsService', ['list', 'update']);
    settings.list.and.returnValue(of([factor]));
    settings.update.and.returnValue(of({ ...factor, value: '15', updatedBy: 'ada' }));

    await TestBed.configureTestingModule({
      imports: [SettingsPage],
      providers: [
        { provide: SettingsService, useValue: settings },
        { provide: ToastrService, useValue: jasmine.createSpyObj('ToastrService', ['success', 'error']) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPage);
    fixture.detectChanges();
  });

  it('renders the group, description, default and live example', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Generación');
    expect(text).toContain('ProteinMPNN');
    expect(text).toContain('Valor por defecto: 20');
    expect(text).toContain('con un minibatch de 100 secuencias, hasta 2000 intentos');
  });

  it('rejects a value outside the backend range', () => {
    const control = fixture.componentInstance.control(factor);
    control.setValue('0');
    control.markAsTouched();
    fixture.detectChanges();
    expect(control.invalid).toBeTrue();
    expect(fixture.nativeElement.textContent).toContain('entre 1 y 1000');
    fixture.componentInstance.save(factor);
    expect(settings.update).not.toHaveBeenCalled();
  });

  it('saves the row and warns when the factor is high', () => {
    const control = fixture.componentInstance.control(factor);
    control.setValue('60');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('hasta 6000 intentos');
    expect(fixture.nativeElement.textContent).toContain('puede tardar horas');

    control.setValue('15');
    fixture.componentInstance.save(factor);
    expect(settings.update).toHaveBeenCalledWith('generation.max_attempt_factor', '15');
  });
});

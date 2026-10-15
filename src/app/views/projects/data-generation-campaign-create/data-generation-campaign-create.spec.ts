import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '@core/services/project.service';
import { DataGenerationCampaignCreate } from './data-generation-campaign-create';

describe('DataGenerationCampaignCreate', () => {
  let fixture: ComponentFixture<DataGenerationCampaignCreate>;
  let component: DataGenerationCampaignCreate;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataGenerationCampaignCreate],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
        { provide: ProjectService, useValue: {} },
        {
          provide: ToastrService,
          useValue: jasmine.createSpyObj('ToastrService', ['warning', 'error', 'success', 'info']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGenerationCampaignCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('rejects numBackbones below 1 and above 20', () => {
    const tooLow = component.createConfigGroup({ numBackbones: 0 });
    tooLow.get('numBackbones')?.markAsTouched();
    tooLow.get('numBackbones')?.updateValueAndValidity();
    expect(tooLow.get('numBackbones')?.hasError('min')).toBeTrue();

    const tooHigh = component.createConfigGroup({ numBackbones: 21 });
    tooHigh.get('numBackbones')?.updateValueAndValidity();
    expect(tooHigh.get('numBackbones')?.hasError('max')).toBeTrue();
  });

  it('blocks submit when review form is invalid', () => {
    component.step = 'review';
    component.configsArray.push(component.createConfigGroup({ numBackbones: 0 }));
    component.confirmCampaign();
    expect(component.submitting).toBeFalse();
  });

  it('computes launch summary from numBackbones and temperature sweep', () => {
    component.configsArray.push(component.createConfigGroup({ numBackbones: 3 }));
    component.configsArray.push(component.createConfigGroup({ numBackbones: 2 }));
    component.updateLaunchSummary();

    const summary = component.launchSummary();
    expect(summary.totalBackbones).toBe(5);
    expect(summary.temperaturesCount).toBe(10);
    expect(summary.totalJobs).toBe(50);
  });
});

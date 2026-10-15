import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ProjectService, type DataGenerationCampaignDetail } from '@core/services/project.service';
import { DataGenerationCampaignProgress } from './data-generation-campaign-progress';

describe('DataGenerationCampaignProgress', () => {
  let fixture: ComponentFixture<DataGenerationCampaignProgress>;
  let component: DataGenerationCampaignProgress;

  const campaignWithFields: DataGenerationCampaignDetail = {
    id: 1,
    status: 'RUNNING',
    numSeqsPerTemperature: 8,
    temperatures: [0.1, 0.2],
    backboneConfigs: [
      {
        contigs: '20-35/0 A1-100',
        hotspots: 'A10, A20',
        chainsToRemove: 'B, C',
        numBackbones: 2,
        completedBackbones: 1,
        backbones: [
          {
            id: 10,
            runId: 'run-1',
            status: 'COMPLETED',
            temperatureJobs: [
              { temperature: 0.1, status: 'COMPLETED', jobId: 100 },
            ],
          },
        ],
      },
    ],
  };

  const campaignMissingFields: DataGenerationCampaignDetail = {
    id: 2,
    status: 'RUNNING',
    backboneConfigs: [
      {
        contigs: 'cfg',
        hotspots: null,
        chainsToRemove: null,
        numBackbones: 1,
        completedBackbones: 0,
        backbones: [],
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataGenerationCampaignProgress],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'projectId' ? '1' : '99'),
              },
            },
          },
        },
        {
          provide: ProjectService,
          useValue: {
            getDataGenerationCampaign: jasmine
              .createSpy('getDataGenerationCampaign')
              .and.returnValue(of(campaignWithFields)),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGenerationCampaignProgress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load campaign', () => {
    expect(component).toBeTruthy();
    expect(component.campaign?.backboneConfigs.length).toBe(1);
  });

  it('renders hotspots and chainsToRemove as chips when present', () => {
    const config = campaignWithFields.backboneConfigs[0];
    expect(component.hotspotChips(config)).toEqual(['A10', 'A20']);
    expect(component.chainChips(config)).toEqual(['B', 'C']);

    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('A10');
    expect(text).toContain('C');
  });

  it('shows em dash when hotspots and chainsToRemove are missing', () => {
    component.campaign = campaignMissingFields;
    fixture.detectChanges();

    const config = campaignMissingFields.backboneConfigs[0];
    expect(component.hotspotChips(config)).toEqual([]);
    expect(component.chainChips(config)).toEqual([]);

    const dashes = (fixture.nativeElement.textContent as string).match(/—/g) ?? [];
    expect(dashes.length).toBeGreaterThanOrEqual(2);
  });
});

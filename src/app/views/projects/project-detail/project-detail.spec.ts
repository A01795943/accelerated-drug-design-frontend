import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { ProjectDetail } from './project-detail';
import { CampaignsTable } from '@views/projects/detail/campaigns-table/campaigns-table';
import { ProjectService } from '@core/services/project.service';

describe('ProjectDetail', () => {
  let fixture: ComponentFixture<ProjectDetail>;
  let component: ProjectDetail;

  const mockProjectService = {
    getProject: jasmine.createSpy('getProject').and.returnValue(
      of({ id: 42, name: 'Test Project' })
    ),
    getBackbones: jasmine.createSpy('getBackbones').and.returnValue(of([])),
    getGenerationJobs: jasmine.createSpy('getGenerationJobs').and.returnValue(of([])),
    getProjectTarget: jasmine.createSpy('getProjectTarget').and.returnValue(of('')),
    getProjectComplex: jasmine.createSpy('getProjectComplex').and.returnValue(of('')),
    listCampaigns: jasmine.createSpy('listCampaigns').and.returnValue(of([])),
  };

  beforeEach(async () => {
    mockProjectService.getProject.and.returnValue(of({ id: 42, name: 'Test Project' }));
    await TestBed.configureTestingModule({
      imports: [ProjectDetail],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? '42' : null),
              },
            },
          },
        },
        { provide: ProjectService, useValue: mockProjectService },
        { provide: NgbModal, useValue: jasmine.createSpyObj('NgbModal', ['open']) },
        {
          provide: ToastrService,
          useValue: jasmine.createSpyObj('ToastrService', ['success', 'error']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows minibatch progress while a job is running', () => {
    component.generationJobs = [
      {
        id: 7,
        status: 'RUNNING',
        completedMinibatches: 1,
        totalMinibatches: 3,
      },
    ];
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Minibatches 1/3');
  });

  it('should render CampaignsTable with the project id from the route', () => {
    const table = fixture.debugElement.query(By.directive(CampaignsTable));

    expect(table).toBeTruthy();
    expect(table.componentInstance.projectId).toBe(42);
    expect(component.projectId()).toBe(42);
  });

  it('should omit EC and the RCSB link when the project has no enzyme metadata', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).not.toContain('EC ');
    expect(text).not.toContain('N/A');
    expect(fixture.nativeElement.querySelector('a[href*="rcsb.org"]')).toBeNull();
  });

  it('should show the EC badge and RCSB link when the project has them', () => {
    mockProjectService.getProject.and.returnValue(
      of({ id: 42, name: 'Trypsin', ecNumber: '3.4.21.4', targetPdbId: '2PTN' })
    );
    component.loadProject(42);
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('a[href*="rcsb.org"]') as HTMLAnchorElement;
    expect(fixture.nativeElement.textContent).toContain('EC 3.4.21.4');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('https://www.rcsb.org/structure/2PTN');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener');
    expect(link.textContent?.trim()).toBe('2PTN');
  });
});

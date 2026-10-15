import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService, type GenerationJobMinibatches } from '@core/services/project.service';
import { MinibatchModal } from './minibatch-modal';

describe('MinibatchModal', () => {
  let fixture: ComponentFixture<MinibatchModal>;

  const payload: GenerationJobMinibatches = {
    jobId: 7,
    jobStatus: 'RUNNING',
    jobStartedAt: '2026-10-08T18:00:00Z',
    jobCompletedAt: null,
    completedMinibatches: 1,
    totalMinibatches: 2,
    minibatches: [
      {
        idx: 0,
        nOffset: 0,
        sequenceEnd: 99,
        numSeqs: 100,
        status: 'COMPLETED',
        runId: 'run_m0',
        instance: { id: 1, name: 'core-a', baseUrl: 'http://10.0.0.1:8000' },
        attempts: 2,
        error: null,
        startedAt: '2026-10-08T18:01:00Z',
        completedAt: '2026-10-08T18:02:00Z',
        durationMillis: 60_000,
        attemptHistory: [
          {
            attempt: 1,
            instance: { id: 2, name: 'core-b', baseUrl: 'http://10.0.0.2:8000' },
            startedAt: '2026-10-08T18:00:10Z',
            finishedAt: '2026-10-08T18:00:20Z',
            durationMillis: 10_000,
            outcome: 'REQUEUED',
            error: 'core unreachable',
          },
          {
            attempt: 2,
            instance: { id: 1, name: 'core-a', baseUrl: 'http://10.0.0.1:8000' },
            startedAt: '2026-10-08T18:01:00Z',
            finishedAt: '2026-10-08T18:02:00Z',
            durationMillis: 60_000,
            outcome: 'COMPLETED',
            error: null,
          },
        ],
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinibatchModal],
      providers: [
        { provide: NgbActiveModal, useValue: { dismiss: () => undefined } },
        {
          provide: ProjectService,
          useValue: { getGenerationJobMinibatches: () => of(payload) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MinibatchModal);
    fixture.componentInstance.projectId = 1;
    fixture.componentInstance.jobId = 7;
    fixture.detectChanges();
  });

  it('shows progress, instance summary and previous attempts', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('1/2');
    expect(text).toContain('0–99');
    expect(text).toContain('core-a');
    expect(text).toContain('Completado');
    expect(text).toContain('1m 0s');

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button.btn-link');
    button.click();
    fixture.detectChanges();
    const expanded = fixture.nativeElement.textContent as string;
    expect(expanded).toContain('core-b');
    expect(expanded).toContain('core unreachable');
    expect(expanded).toContain('REQUEUED');
  });
});

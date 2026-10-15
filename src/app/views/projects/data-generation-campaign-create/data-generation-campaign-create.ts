import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  ProjectService,
  type GenerateResult,
} from '@core/services/project.service';
import { chainsToRemoveFormValue } from '@views/projects/data-generation-campaign-create/campaign-form.utils';
import { ToastrService } from 'ngx-toastr';

type Step = 'form' | 'review';

export interface CampaignLaunchSummary {
  totalBackbones: number;
  totalJobs: number;
  temperaturesCount: number;
}

@Component({
  selector: 'app-data-generation-campaign-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './data-generation-campaign-create.html',
})
export class DataGenerationCampaignCreate {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectService = inject(ProjectService);
  private toastr = inject(ToastrService);
  private destroyRef = inject(DestroyRef);

  projectId!: number;
  step: Step = 'form';
  loadingSuggestions = false;
  submitting = false;

  requestedCount = 0;
  generatedCount = 0;

  launchSummary = signal<CampaignLaunchSummary>({
    totalBackbones: 0,
    totalJobs: 0,
    temperaturesCount: 0,
  });

  form: FormGroup = this.fb.group({
    count: [3, [Validators.required, Validators.min(1)]],
    minLength: [12, [Validators.required, Validators.min(1)]],
    maxLength: [30, [Validators.required, Validators.min(1)]],
    temperatureMin: [0.1, [Validators.required, Validators.min(0), Validators.max(1)]],
    temperatureMax: [1.0, [Validators.required, Validators.min(0), Validators.max(1)]],
    temperatureStep: [0.1, [Validators.required, Validators.min(0.01), Validators.max(1)]],
    numSeqsPerTemperature: [16, [Validators.required, Validators.min(1)]],
    iterations: [30, [Validators.min(1)]],
  });

  reviewForm: FormGroup = this.fb.group({
    configs: this.fb.array<FormGroup>([]),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('projectId');
    this.projectId = id != null ? Number(id) : 0;

    this.reviewForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.updateLaunchSummary();
    });
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.step === 'review') {
        this.updateLaunchSummary();
      }
    });
  }

  get configsArray(): FormArray<FormGroup> {
    return this.reviewForm.get('configs') as FormArray<FormGroup>;
  }

  createConfigGroup(values?: {
    contigs?: string;
    hotspots?: string;
    chainsToRemove?: string;
    iterations?: number;
    numBackbones?: number;
  }): FormGroup {
    return this.fb.group({
      contigs: [values?.contigs ?? ''],
      hotspots: [values?.hotspots ?? ''],
      chainsToRemove: [values?.chainsToRemove ?? ''],
      iterations: [values?.iterations ?? 30, [Validators.min(1)]],
      numBackbones: [
        values?.numBackbones ?? 1,
        [Validators.required, Validators.min(1), Validators.max(20)],
      ],
    });
  }

  buildTemperatureSweep(): number[] {
    const v = this.form.value;
    const min = Number(v.temperatureMin);
    const max = Number(v.temperatureMax);
    const step = Number(v.temperatureStep);
    if (max < min) {
      throw new Error('La temperatura máxima debe ser >= mínima');
    }
    const temps: number[] = [];
    for (let t = min; t <= max + 1e-9; t = Math.round((t + step) * 1000) / 1000) {
      temps.push(Math.round(t * 1000) / 1000);
      if (temps.length > 100) {
        throw new Error('Demasiados puntos en el barrido de temperatura (máx. 100)');
      }
    }
    return temps;
  }

  updateLaunchSummary(): void {
    let temperaturesCount = 0;
    try {
      temperaturesCount = this.buildTemperatureSweep().length;
    } catch {
      this.launchSummary.set({ totalBackbones: 0, totalJobs: 0, temperaturesCount: 0 });
      return;
    }

    const totalBackbones = this.configsArray.controls.reduce((sum, group) => {
      const n = Number(group.get('numBackbones')?.value);
      return sum + (Number.isFinite(n) ? n : 0);
    }, 0);

    this.launchSummary.set({
      totalBackbones,
      totalJobs: totalBackbones * temperaturesCount,
      temperaturesCount,
    });
  }

  generateSuggestions(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    const minLength = Number(v.minLength);
    const maxLength = Number(v.maxLength);
    if (maxLength < minLength) {
      this.toastr.warning('maxLength debe ser >= minLength');
      return;
    }
    try {
      this.buildTemperatureSweep();
    } catch (e: unknown) {
      this.toastr.warning(e instanceof Error ? e.message : 'Barrido de temperatura inválido');
      return;
    }

    this.loadingSuggestions = true;
    this.projectService
      .generateSuggestions(this.projectId, Number(v.count), minLength, maxLength)
      .subscribe({
        next: (res) => {
          this.requestedCount = res.requestedCount;
          this.generatedCount = res.generatedCount;
          const iterations = Number(v.iterations) || 30;

          const previousNumBackbones = this.configsArray.controls.map(
            (group) => group.get('numBackbones')?.value ?? 1
          );

          this.configsArray.clear();
          res.suggestions.forEach((s: GenerateResult, index: number) => {
            this.configsArray.push(
              this.createConfigGroup({
                contigs: s.contig,
                hotspots: s.hotspots,
                chainsToRemove: chainsToRemoveFormValue(s.chainsToRemove),
                iterations,
                numBackbones: previousNumBackbones[index] ?? 1,
              })
            );
          });

          if (this.configsArray.length === 0) {
            this.toastr.error('No se pudieron generar sugerencias para este proyecto.');
            this.loadingSuggestions = false;
            return;
          }

          this.step = 'review';
          this.loadingSuggestions = false;
          this.updateLaunchSummary();

          if (res.generatedCount < res.requestedCount) {
            this.toastr.info(
              `Se generaron ${res.generatedCount} de ${res.requestedCount} sugerencias (estructura con patches limitados).`
            );
          }
        },
        error: (err) => {
          this.loadingSuggestions = false;
          this.toastr.error(err?.error?.error || err?.message || 'Error al generar sugerencias');
        },
      });
  }

  backToForm(): void {
    this.step = 'form';
  }

  confirmCampaign(): void {
    if (this.submitting || this.configsArray.length === 0) {
      return;
    }
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    let temperatures: number[];
    try {
      temperatures = this.buildTemperatureSweep();
    } catch (e: unknown) {
      this.toastr.warning(e instanceof Error ? e.message : 'Barrido inválido');
      return;
    }

    this.submitting = true;
    this.projectService
      .createDataGenerationCampaign(this.projectId, {
        backboneConfigs: this.configsArray.controls.map((group) => ({
          contigs: group.value.contigs?.trim() || undefined,
          hotspots: group.value.hotspots?.trim() || undefined,
          chainsToRemove: group.value.chainsToRemove?.trim() || undefined,
          iterations: Number(group.value.iterations) || 30,
          numBackbones: Number(group.value.numBackbones),
        })),
        temperatures,
        numSeqsPerTemperature: Number(this.form.value.numSeqsPerTemperature) || 16,
      })
      .subscribe({
        next: (res) => {
          this.toastr.success('Campaña iniciada.');
          this.router.navigate(['/projects/detail', this.projectId, 'campaign', res.campaignId]);
        },
        error: (err) => {
          this.submitting = false;
          this.toastr.error(err?.error?.error || err?.message || 'Error al crear la campaña');
        },
      });
  }
}

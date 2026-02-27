import {
  Component,
  OnInit,
  inject,
  ViewChild,
  TemplateRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common'
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap'
import {
  ProjectService,
  type DescriptiveStatsResponse,
  type DistributionResponse,
  type BinsResponse,
} from '@core/services/project.service'
import type { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule, ApexAnnotations } from 'ng-apexcharts'
import { forkJoin } from 'rxjs'

/** Sentinel for -inf / +inf in bins (JSON-safe). */
const NEG_INF = -1e10
const POS_INF = 1e10

const NUM_HISTOGRAM_BINS = 30

const METRIC_LABELS: Record<string, string> = {
  mpnn: 'MPNN',
  plddt: 'pLDDT',
  ptm: 'pTM',
  i_ptm: 'iPTM',
  pae: 'PAE',
  i_pae: 'iPAE',
  rmsd: 'RMSD',
}

/** Bins config for each metric (order matches user spec). */
const BINS_CONFIG: { metric: string; bins: number[]; labels: string[] }[] = [
  {
    metric: 'plddt',
    bins: [NEG_INF, 0.7, 0.9, POS_INF],
    labels: [
      'Baja confianza (<0.70)',
      'Buena confianza (0.70–0.90)',
      'Muy alta confianza (≥0.90)',
    ],
  },
  {
    metric: 'ptm',
    bins: [NEG_INF, 0.6, 0.8, POS_INF],
    labels: [
      'Baja confianza (<0.6)',
      'Estructura plausible (0.6–0.8)',
      'Alta confianza estructural (≥0.8)',
    ],
  },
  {
    metric: 'i_ptm',
    bins: [NEG_INF, 0.6, 0.8, POS_INF],
    labels: [
      'Interfaz incierta (<0.6)',
      'Interacción plausible (0.6–0.8)',
      'Interacción muy confiable (≥0.8)',
    ],
  },
  {
    metric: 'pae',
    bins: [NEG_INF, 5, 15, POS_INF],
    labels: [
      'Alta precisión (<5 Å)',
      'Precisión moderada (5–15 Å)',
      'Alta incertidumbre (≥15 Å)',
    ],
  },
  {
    metric: 'i_pae',
    bins: [NEG_INF, 3, 10, POS_INF],
    labels: [
      'Interfaz muy bien definida (<3 Å)',
      'Interfaz razonable (3–10 Å)',
      'Interfaz incierta (≥10 Å)',
    ],
  },
  {
    metric: 'rmsd',
    bins: [NEG_INF, 2, 5, POS_INF],
    labels: [
      'Excelente ajuste (<2 Å)',
      'Ajuste moderado (2–5 Å)',
      'Baja similitud estructural (≥5 Å)',
    ],
  },
]

/** Column order for descriptive stats table. */
const STATS_COLUMNS = ['ptm', 'i_ptm', 'pae', 'i_pae', 'plddt', 'rmsd', 'mpnn'] as const

/** Row keys and display labels for descriptive stats table. */
const STATS_ROWS: { key: string; label: string }[] = [
  { key: 'mean', label: 'Mean' },
  { key: 'std', label: 'Std' },
  { key: 'min', label: 'Min' },
  { key: 'p25', label: '25%' },
  { key: 'p50', label: '50%' },
  { key: 'p75', label: '75%' },
  { key: 'max', label: 'Max' },
  { key: 'skew', label: 'Skew' },
  { key: 'kurtosis', label: 'Kurtosis' },
  { key: 'cv', label: 'CV (Coef. variación)' },
  { key: 'quality', label: 'Quality' },
]

/** Order: ptm, i_ptm, pae, i_pae, plddt, rmsd, mpnn (each distribution + bins when applicable). */
const DISTRIBUTION_METRICS = [
  'ptm',
  'i_ptm',
  'pae',
  'i_pae',
  'plddt',
  'rmsd',
  'mpnn',
]

export type ChartItem =
  | { type: 'distribution'; metric: string; options: Partial<ChartOptions> }
  | { type: 'bins'; metric: string; options: Partial<ChartOptions> }

function buildHistogramBins(
  values: number[],
  numBins: number
): { counts: number[]; categories: string[]; minVal: number; maxVal: number } {
  const counts = new Array<number>(numBins).fill(0)
  if (values.length === 0) {
    const cat: string[] = []
    for (let i = 0; i < numBins; i++) cat.push(`Bin ${i + 1}`)
    return { counts, categories: cat, minVal: 0, maxVal: 1 }
  }
  const minVal = Math.min(...values)
  const maxVal = Math.max(...values)
  const range = maxVal - minVal || 1
  const step = range / numBins
  const categories: string[] = []
  for (let i = 0; i < numBins; i++) {
    const lo = minVal + i * step
    const hi = minVal + (i + 1) * step
    categories.push(`${lo.toFixed(3)}–${hi.toFixed(3)}`)
  }
  for (const v of values) {
    let idx = Math.floor((v - minVal) / step)
    if (idx >= numBins) idx = numBins - 1
    if (idx < 0) idx = 0
    counts[idx]++
  }
  return { counts, categories, minVal, maxVal }
}

@Component({
  selector: 'app-job-eda',
  standalone: true,
  imports: [CommonModule, RouterLink, NgApexchartsModule, NgbModalModule],
  templateUrl: './job-eda.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: [
    `
      .mpnn-info-body {
        font-size: 1.05rem;
      }
      .quality-metrics .formula {
        background: var(--bs-light, #f8f9fa);
        border: 1px solid var(--bs-border-color, #dee2e6);
        border-radius: 0.375rem;
        padding: 0.5rem 0.75rem;
        margin: 0.5rem 0 1rem;
        font-family: var(--bs-font-monospace);
        font-size: 0.95rem;
      }
      .quality-metrics code {
        background: rgba(0, 0, 0, 0.06);
        padding: 0.15em 0.4em;
        border-radius: 0.25rem;
        font-size: 0.9em;
      }
      .dataset-quality {
        font-size: 1.05rem;
      }
      .dataset-quality h2 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
      }
      .dataset-quality h3 {
        font-size: 1.1rem;
        margin-top: 1.25rem;
        margin-bottom: 0.5rem;
      }
      .dataset-quality .formula {
        background: var(--bs-light, #f8f9fa);
        border: 1px solid var(--bs-border-color, #dee2e6);
        border-radius: 0.375rem;
        padding: 0.5rem 0.75rem;
        margin: 0.5rem 0 1rem;
        font-family: var(--bs-font-monospace);
        font-size: 0.95rem;
      }
      .dataset-quality code {
        background: rgba(0, 0, 0, 0.06);
        padding: 0.15em 0.4em;
        border-radius: 0.25rem;
        font-size: 0.9em;
      }
      .dataset-quality .weights-table {
        margin: 0.5rem 0 1rem;
      }
    `,
  ],
})
export class JobEda implements OnInit {
  private route = inject(ActivatedRoute)
  private projectService = inject(ProjectService)
  private modal = inject(NgbModal)

  @ViewChild('qualityInfoModal') private qualityInfoModalRef!: TemplateRef<unknown>

  projectId: number | null = null
  jobId: number | null = null
  loading = true
  error: string | null = null
  descriptiveStats: DescriptiveStatsResponse | null = null
  descriptiveStatsError = false
  datasetQuality: number | null = null
  datasetQualityError = false
  charts: ChartItem[] = []

  readonly statsColumns = STATS_COLUMNS
  readonly statsRows = STATS_ROWS
  readonly metricLabels = METRIC_LABELS

  ngOnInit(): void {
    const pid = this.route.snapshot.paramMap.get('projectId')
    const jid = this.route.snapshot.paramMap.get('jobId')
    if (pid && jid) {
      this.projectId = Number(pid)
      this.jobId = Number(jid)
      this.load()
    } else {
      this.loading = false
      this.error = 'Faltan el ID del proyecto o del job.'
    }
  }

  openQualityInfoModal(): void {
    this.modal.open(this.qualityInfoModalRef, { size: 'lg', scrollable: true })
  }

  openMetricInfoModal(content: TemplateRef<unknown>): void {
    this.modal.open(content, { size: 'lg', scrollable: true })
  }

  load(): void {
    if (this.projectId == null || this.jobId == null) return
    this.loading = true
    this.error = null

    const distRequests = DISTRIBUTION_METRICS.map((metric) =>
      this.projectService.getEdaDistribution(
        this.projectId!,
        this.jobId!,
        metric
      )
    )
    const binsRequests = BINS_CONFIG.map((cfg) =>
      this.projectService.getEdaBins(this.projectId!, this.jobId!, cfg.metric, {
        bins: cfg.bins,
        labels: cfg.labels,
      })
    )

    this.projectService
      .getEdaDescriptiveStats(this.projectId!, this.jobId!)
      .subscribe({
        next: (stats) => (this.descriptiveStats = stats),
        error: () => (this.descriptiveStatsError = true),
      })

    this.projectService
      .getEdaDatasetQuality(this.projectId!, this.jobId!)
      .subscribe({
        next: (res) => (this.datasetQuality = res.quality),
        error: () => (this.datasetQualityError = true),
      })

    forkJoin([forkJoin(distRequests), forkJoin(binsRequests)]).subscribe({
      next: ([distResults, binsResults]) => {
        this.charts = []
        const distByMetric = new Map<string, DistributionResponse>()
        DISTRIBUTION_METRICS.forEach((m, i) =>
          distByMetric.set(m, distResults[i])
        )

        for (const metric of DISTRIBUTION_METRICS) {
          const dist = distByMetric.get(metric)!
          const opts = this.distributionToChartOptions(dist)
          this.charts.push({ type: 'distribution', metric, options: opts })
          const cfg = BINS_CONFIG.find((c) => c.metric === metric)
          if (cfg) {
            const binsRes = binsResults[BINS_CONFIG.indexOf(cfg)]
            this.charts.push({
              type: 'bins',
              metric,
              options: this.binsToChartOptions(binsRes),
            })
          }
        }
        this.loading = false
      },
      error: (err) => {
        this.error =
          err?.error?.error || err?.message || 'Error al cargar datos EDA.'
        this.loading = false
      },
    })
  }

  distributionToChartOptions(res: DistributionResponse): Partial<ChartOptions> {
    const values = res.values ?? []
    const { counts, categories, minVal, maxVal } = buildHistogramBins(
      values,
      NUM_HISTOGRAM_BINS
    )
    const label = METRIC_LABELS[res.columnName] ?? res.columnName

    let minBinIndex = 0
    let maxBinIndex = categories.length - 1
    if (values.length > 0 && res.min != null && res.max != null) {
      const range = maxVal - minVal || 1
      const step = range / NUM_HISTOGRAM_BINS
      minBinIndex = Math.min(
        categories.length - 1,
        Math.max(0, Math.floor((res.min - minVal) / step))
      )
      maxBinIndex = Math.min(
        categories.length - 1,
        Math.max(0, Math.floor((res.max - minVal) / step))
      )
    }

    const annotations: ApexAnnotations = {
      xaxis: [
        {
          x: categories[minBinIndex] ?? categories[0],
          strokeDashArray: 0,
          borderColor: '#991b1b',
          label: {
            borderColor: '#991b1b',
            style: { color: '#fff', background: '#991b1b', fontSize: '16px' },
            text: res.min != null ? `Min: ${res.min.toFixed(3)}` : 'Min',
          },
        },
        {
          x: categories[maxBinIndex] ?? categories[categories.length - 1],
          strokeDashArray: 0,
          borderColor: '#166534',
          label: {
            borderColor: '#166534',
            style: { color: '#fff', background: '#166534', fontSize: '16px' },
            text: res.max != null ? `Max: ${res.max.toFixed(3)}` : 'Max',
          },
        },
      ],
    }

    return {
      chart: {
        type: 'bar',
        height: 320,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '90%',
          borderRadius: 2,
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 1, colors: ['#4da6ff'] },
      fill: { opacity: 0.75 },
      xaxis: { categories },
      yaxis: {
        title: { text: 'Frecuencia' },
        labels: {
          formatter: (val: number) =>
            val != null ? String(Math.round(val)) : '',
        },
      },
      grid: { borderColor: '#e9ecef', strokeDashArray: 4 },
      legend: { show: false },
      tooltip: {
        y: {
          formatter: (val: number) => (val != null ? `${val} registros` : ''),
        },
      },
      title: {
        text: `Distribución de ${label}`,
        align: 'left',
        style: { fontSize: '16px' },
      },
      series: [{ name: 'Frecuencia', data: counts }],
      colors: ['#4da6ff'],
      annotations,
    }
  }

  binsToChartOptions(res: BinsResponse): Partial<ChartOptions> {
    const label = METRIC_LABELS[res.columnName] ?? res.columnName
    let labels = [...(res.labels ?? [])]
    let counts = (res.counts ?? []).map(Number)
    let percentages = [...(res.percentages ?? [])]
    // pTM, iPTM y pLDDT: mostrar alta confianza arriba y baja abajo
    if (res.columnName === 'ptm' || res.columnName === 'i_ptm' || res.columnName === 'plddt') {
      labels = labels.reverse()
      counts = counts.reverse()
      percentages = percentages.reverse()
    }

    return {
      chart: {
        type: 'bar',
        height: 280,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '60%',
          borderRadius: 2,
          dataLabels: {
            position: 'top' as const,
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number, opts: { dataPointIndex: number }) => {
          const i = opts?.dataPointIndex ?? 0
          const pct = percentages[i] ?? 0
          return ` ${Math.round(Number(val))} (${pct.toFixed(1)}%)`
        },
        style: { fontSize: '16px' },
        offsetX: 4,
      },
      stroke: { show: true, width: 1, colors: ['#7f56da'] },
      fill: { opacity: 0.85 },
      xaxis: {
        categories: labels,
        title: { text: 'Conteo' },
        labels: {
          formatter: (val: number) =>
            val != null ? String(Math.round(Number(val))) : '',
        },
      },
      yaxis: {
        labels: { maxWidth: 320 },
      },
      grid: {
        borderColor: '#e9ecef',
        strokeDashArray: 4,
        xaxis: { lines: { show: true } },
      },
      legend: { show: false },
      tooltip: {
        y: {
          formatter: (val: number, opts: { dataPointIndex: number }) => {
            const i = opts?.dataPointIndex ?? 0
            const pct = percentages[i] ?? 0
            return `${val} (${pct.toFixed(1)}%)`
          },
        },
      },
      title: {
        text: `Distribución categorizada de ${label}`,
        align: 'left',
        style: { fontSize: '16px' },
      },
      series: [{ name: 'Conteo', data: counts }],
      colors: ['#7f56da'],
      annotations: {},
    }
  }

  getChartId(item: ChartItem, index: number): string {
    return `${item.type}-${item.metric}-${index}`
  }

  getPtmBinsChart(): ChartItem | null {
    return this.charts.find((c) => c.metric === 'ptm' && c.type === 'bins') ?? null
  }

  getIptmBinsChart(): ChartItem | null {
    return this.charts.find((c) => c.metric === 'i_ptm' && c.type === 'bins') ?? null
  }

  getPaeBinsChart(): ChartItem | null {
    return this.charts.find((c) => c.metric === 'pae' && c.type === 'bins') ?? null
  }

  getIpaeBinsChart(): ChartItem | null {
    return this.charts.find((c) => c.metric === 'i_pae' && c.type === 'bins') ?? null
  }

  getPlddtBinsChart(): ChartItem | null {
    return this.charts.find((c) => c.metric === 'plddt' && c.type === 'bins') ?? null
  }

  getRmsdBinsChart(): ChartItem | null {
    return this.charts.find((c) => c.metric === 'rmsd' && c.type === 'bins') ?? null
  }

  statCellValue(metric: string, rowKey: string): string {
    const stats = this.descriptiveStats?.[metric]
    if (!stats) return '—'
    if (rowKey === 'cv') {
      const rec = stats as unknown as Record<string, number | null | undefined>
      const mean = rec['mean']
      const std = rec['std']
      if (mean == null || std == null || Number.isNaN(mean) || Number.isNaN(std) || mean === 0)
        return '—'
      const cv = std / mean
      if (Number.isNaN(cv)) return '—'
      return (cv * 100).toFixed(2) + '%'
    }
    if (rowKey === 'quality') {
      const v = (stats as unknown as Record<string, number | null | undefined>)['quality']
      if (v == null || Number.isNaN(v)) return '—'
      const num = typeof v === 'number' ? v : Number(v)
      const pct = num <= 1 && num >= 0 ? num * 100 : num
      return pct.toFixed(2) + '%'
    }
    const v = (stats as unknown as Record<string, number | null | undefined>)[rowKey]
    if (v == null || Number.isNaN(v)) return '—'
    return typeof v === 'number' ? v.toFixed(4) : String(v)
  }

  /** CV &lt; 0.1 → Bajo, 0.1–0.3 → Medio, &gt;0.3 → Alto */
  cvBadgeLabel(metric: string): 'Bajo' | 'Medio' | 'Alto' | null {
    const stats = this.descriptiveStats?.[metric]
    if (!stats) return null
    const rec = stats as unknown as Record<string, number | null | undefined>
    const mean = rec['mean']
    const std = rec['std']
    if (mean == null || std == null || Number.isNaN(mean) || Number.isNaN(std) || mean === 0)
      return null
    const cv = std / mean
    if (Number.isNaN(cv)) return null
    if (cv < 0.1) return 'Bajo'
    if (cv <= 0.3) return 'Medio'
    return 'Alto'
  }

  getChartTitle(item: ChartItem): string {
    if (item.type === 'distribution') {
      return `Distribución de ${METRIC_LABELS[item.metric] ?? item.metric}`
    }
    return `Bins: ${METRIC_LABELS[item.metric] ?? item.metric}`
  }
}

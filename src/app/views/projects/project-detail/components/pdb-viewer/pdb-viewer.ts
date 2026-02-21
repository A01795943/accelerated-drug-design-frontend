import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/** Atom from 3Dmol model (minimal shape for CA labels) */
interface Atom3Dmol {
  atom?: string;
  resi?: number | string;
  resn?: string;
  x: number;
  y: number;
  z: number;
}

/** 3Dmol model (getAtoms) */
interface Model3Dmol {
  getAtoms?: () => Atom3Dmol[];
}

/** 3Dmol viewer instance (from window.$3Dmol.createViewer) */
interface Viewer3Dmol {
  addModel: (data: string, format: string) => void;
  setStyle: (sel: object, style: object) => void;
  zoomTo: () => void;
  render: () => void;
  zoom: (factor: number, duration?: number) => void;
  setBackgroundColor: (color: string) => void;
  addLabel?: (text: string, options: object, sel?: object, noshow?: boolean) => unknown;
  removeAllLabels?: () => void;
  /** Get atoms matching selection, e.g. { atom: 'CA' } for alpha carbons. */
  selectedAtoms?: (sel: object) => Atom3Dmol[];
}

declare global {
  interface Window {
    $3Dmol?: {
      createViewer: (element: HTMLElement, config?: Record<string, unknown>) => Viewer3Dmol;
    };
  }
}

@Component({
  selector: 'app-pdb-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdb-viewer.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: [
    `
      :host {
        display: block;
        position: relative;
      }
      .pdb-viewer-wrapper {
        position: relative;
        display: block;
        width: 100%;
      }
      .pdb-viewer-container {
        width: 100%;
        height: 400px;
        position: relative;
        background: var(--bs-body-bg, #1a1d21);
        border-radius: 0.375rem;
      }
      .pdb-viewer-toolbar {
        z-index: 100;
        pointer-events: auto;
      }
      .pdb-viewer-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: var(--bs-secondary);
        font-size: 0.875rem;
      }
    `,
  ],
})
export class PdbViewerComponent implements AfterViewInit, OnChanges {
  @Input() pdbContent: string | null | undefined = '';
  @Input() title = 'PDB';
  /** Height in pixels; default 400. Use a smaller value (e.g. 220) in cards. */
  @Input() height = 400;

  @ViewChild('viewerContainer', { static: false }) viewerContainerRef!: ElementRef<HTMLDivElement>;

  /** Whether residue labels are currently shown. */
  showResidueLabels = false;

  private viewer: Viewer3Dmol | null = null;
  private containerElement: HTMLDivElement | null = null;

  ngAfterViewInit(): void {
    this.containerElement = this.viewerContainerRef?.nativeElement ?? null;
    this.renderIfReady();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pdbContent']) {
      this.renderIfReady();
    }
  }

  private renderIfReady(): void {
    if (!this.containerElement) return;

    this.clearViewer();

    const content = (this.pdbContent || '').trim();
    if (!content) {
      this.containerElement.innerHTML = '<div class="pdb-viewer-placeholder">No PDB data</div>';
      return;
    }

    const $3Dmol = (typeof window !== 'undefined' && window.$3Dmol) || null;
    if (!$3Dmol) {
      this.containerElement.innerHTML = '<div class="pdb-viewer-placeholder">3Dmol.js loading…</div>';
      setTimeout(() => this.renderIfReady(), 200);
      return;
    }

    const inner = document.createElement('div');
    inner.className = 'pdb-viewer-inner';
    inner.style.width = '100%';
    inner.style.height = '100%';
    this.containerElement.innerHTML = '';
    this.containerElement.appendChild(inner);

    try {
      const config: Record<string, unknown> = {
        backgroundColor: 'black',
      };
      this.viewer = $3Dmol.createViewer(inner, config);
      this.viewer.addModel(content, 'pdb');
      this.viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
      this.viewer.zoomTo();
      this.viewer.render();
      this.viewer.zoom(1.0, 500);
    } catch (e) {
      console.error('3Dmol viewer error:', e);
      this.containerElement.innerHTML = '<div class="pdb-viewer-placeholder">Failed to load structure.</div>';
    }
  }

  private clearViewer(): void {
    this.viewer = null;
    this.showResidueLabels = false;
    if (this.containerElement) {
      this.containerElement.innerHTML = '';
    }
  }

  /** Recenter and zoom to fit the structure. */
  recenter(): void {
    if (!this.viewer) return;
    try {
      this.viewer.zoomTo();
      this.viewer.render();
    } catch (e) {
      console.error('3Dmol recenter error:', e);
    }
  }

  /** Toggle residue labels on/off (one label per residue, no CA restriction). */
  toggleResidueLabels(): void {
    if (!this.viewer) return;
    const v = this.viewer as unknown as Record<string, unknown>;
    const removeAllLabels = v['removeAllLabels'] as (() => void) | undefined;
    const render = v['render'] as (() => void) | undefined;
    const getModel = v['getModel'] as ((index?: number) => Record<string, unknown> | undefined) | undefined;
    if (!removeAllLabels || !render) return;
    try {
      if (this.showResidueLabels) {
        removeAllLabels();
        this.showResidueLabels = false;
      } else {
        const labelOpts = {
          font: 'sans-serif',
          fontSize: 10,
          fontColor: 'white',
          showBackground: true,
          backgroundColor: 'black',
          backgroundOpacity: 0.7,
        };
        // 3Dmol: addResLabels lives on the model and needs (sel, viewer, opts); viewer.addResLabels fails (undefined.labels)
        const model = getModel?.() ?? getModel?.(0);
        const addResLabelsModel = model?.['addResLabels'] as ((sel: object, viewer: unknown, opts: object) => void) | undefined;
        if (addResLabelsModel && model) {
          addResLabelsModel({}, this.viewer, labelOpts);
          this.showResidueLabels = true;
        }
      }
      render();
    } catch (e) {
      console.error('3Dmol residue labels error:', e);
    }
  }
}

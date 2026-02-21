import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { PdbViewerComponent } from '../pdb-viewer/pdb-viewer';

@Component({
  selector: 'app-pdb-content-modal',
  standalone: true,
  imports: [CommonModule, NgbNavModule, PdbViewerComponent],
  templateUrl: './pdb-content-modal.html',
  styles: [
    `
      .pdb-modal-body {
        min-height: 70vh;
        display: flex;
        flex-direction: column;
      }
      .pdb-tab-content {
        flex: 1;
        min-height: 60vh;
        overflow: auto;
      }
      .pdb-content-pre {
        min-height: 60vh;
        overflow: auto;
        font-size: 0.75rem;
        white-space: pre-wrap;
        word-break: break-all;
      }
      .pdb-viewer-tab {
        min-height: 60vh;
      }
    `,
  ],
})
export class PdbContentModal {
  /** Set by the parent when opening the modal. */
  title = 'PDB';
  /** Set by the parent when opening the modal. */
  pdbContent = '';
  /** When false, only text content is shown (no PDB viewer tab). Use for FASTA etc. */
  showViewer = true;
  /** File extension for download (e.g. 'pdb', 'fasta', 'txt'). */
  downloadExtension = 'pdb';

  private activeModal = inject(NgbActiveModal);

  close(): void {
    this.activeModal.dismiss();
  }

  download(): void {
    const content = this.pdbContent || '';
    if (!content.trim()) return;
    const filename = `${this.title.toLowerCase().replace(/\s+/g, '-')}.${this.downloadExtension}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}

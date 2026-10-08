/** Display label for a core run status. QUEUED is shown in Spanish; others stay as stored. */
export function runStatusLabel(status?: string | null): string {
  if (!status) return '—';
  return status.toUpperCase() === 'QUEUED' ? 'En cola' : status;
}

/** Badge classes: QUEUED is distinct from RUNNING (primary). */
export function runStatusBadgeClass(status?: string | null): string {
  switch ((status || '').toUpperCase()) {
    case 'COMPLETED':
      return 'bg-success-subtle text-success';
    case 'QUEUED':
      return 'bg-warning-subtle text-warning';
    case 'ERROR':
    case 'PARTIAL':
      return 'bg-danger-subtle text-danger';
    case 'RUNNING':
      return 'bg-primary-subtle text-primary';
    default:
      return 'bg-secondary-subtle text-secondary';
  }
}

/** True while the dispatcher may still assign the run or the core is executing it. */
export function isInFlightRunStatus(status?: string | null): boolean {
  const s = (status || '').toUpperCase();
  return s === 'QUEUED' || s === 'RUNNING';
}

import { isInFlightRunStatus, runStatusBadgeClass, runStatusLabel } from './run-status';

describe('run-status', () => {
  it('renders QUEUED as En cola', () => {
    expect(runStatusLabel('QUEUED')).toBe('En cola');
  });

  it('keeps other statuses as stored', () => {
    expect(runStatusLabel('RUNNING')).toBe('RUNNING');
    expect(runStatusLabel('COMPLETED')).toBe('COMPLETED');
    expect(runStatusLabel(null)).toBe('—');
  });

  it('uses a distinct badge for QUEUED vs RUNNING', () => {
    expect(runStatusBadgeClass('QUEUED')).toBe('bg-warning-subtle text-warning');
    expect(runStatusBadgeClass('RUNNING')).toBe('bg-primary-subtle text-primary');
  });

  it('treats QUEUED and RUNNING as in-flight for polling', () => {
    expect(isInFlightRunStatus('QUEUED')).toBeTrue();
    expect(isInFlightRunStatus('RUNNING')).toBeTrue();
    expect(isInFlightRunStatus('COMPLETED')).toBeFalse();
  });
});

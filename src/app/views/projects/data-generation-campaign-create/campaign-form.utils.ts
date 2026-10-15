/** Split comma-separated API strings into trimmed chip labels. */
export function splitCommaSeparated(value: string | null | undefined): string[] {
  if (value == null || !String(value).trim()) {
    return [];
  }
  return String(value)
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
}

/** Normalize chainsToRemove from suggestions API (array) or stored string. */
export function normalizeChainsToRemove(value: string | string[] | null | undefined): string[] {
  if (Array.isArray(value)) {
    return value.map((c) => String(c).trim()).filter(Boolean);
  }
  return splitCommaSeparated(value);
}

/** Display form value for chainsToRemove (comma-separated string). */
export function chainsToRemoveFormValue(value: string | string[] | null | undefined): string {
  return normalizeChainsToRemove(value).join(', ');
}

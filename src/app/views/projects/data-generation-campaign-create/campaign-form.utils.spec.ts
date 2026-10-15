import { normalizeChainsToRemove, splitCommaSeparated } from './campaign-form.utils';

describe('campaign-form.utils', () => {
  it('normalizes chainsToRemove array from suggestions API', () => {
    expect(normalizeChainsToRemove([' B ', 'C'])).toEqual(['B', 'C']);
  });

  it('normalizes chainsToRemove comma-separated string', () => {
    expect(normalizeChainsToRemove('B, C, D')).toEqual(['B', 'C', 'D']);
  });
});

describe('splitCommaSeparated', () => {
  it('returns empty array for null or blank', () => {
    expect(splitCommaSeparated(null)).toEqual([]);
    expect(splitCommaSeparated('   ')).toEqual([]);
  });
});

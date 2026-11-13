import {describe, expect, it} from 'vitest';
import {formatNumberId} from './format';

describe('formatNumberId', () => {
  it.each([
    [0, '0'],
    [999, '999'],
    [1000, '1.000'],
    [68000, '68.000'],
    [1234567, '1.234.567'],
    [-15000, '-15.000'],
  ])('formats %d as %s', (value, expected) => {
    expect(formatNumberId(value)).toBe(expected);
  });

  it('rounds fractions to a whole number', () => {
    expect(formatNumberId(500.5)).toBe('501');
  });

  it('matches the id-ID convention used previously', () => {
    for (const n of [0, 5000, 68000, 193200, 2500000]) {
      expect(formatNumberId(n)).toBe(n.toLocaleString('id-ID'));
    }
  });
});

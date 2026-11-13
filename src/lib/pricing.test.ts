import {describe, expect, it} from 'vitest';
import {DRINK_SIZE_SURCHARGE, FOOD_SIZE_SURCHARGE, sumSelectedPrices} from './pricing';

describe('size surcharges', () => {
  // These values are shown as labels in the UI ("+Rp 24.000", "+Rp 15.000", "+Rp 6.000").
  it('keeps the food surcharges the UI advertises', () => {
    expect(FOOD_SIZE_SURCHARGE).toEqual({Regular: 0, 'Double Patty': 24000, Upsize: 15000});
  });

  it('keeps the drink surcharges the UI advertises', () => {
    expect(DRINK_SIZE_SURCHARGE).toEqual({Regular: 0, Large: 6000});
  });
});

describe('sumSelectedPrices', () => {
  const options = [
    {id: 'egg', price: 6000},
    {id: 'cheese', price: 8000},
  ];

  it('sums the selected options', () => {
    expect(sumSelectedPrices(['egg', 'cheese'], options)).toBe(14000);
  });

  it('counts unknown ids as zero and an empty selection as zero', () => {
    expect(sumSelectedPrices(['nope'], options)).toBe(0);
    expect(sumSelectedPrices([], options)).toBe(0);
  });
});

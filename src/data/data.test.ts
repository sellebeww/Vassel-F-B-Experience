import {describe, expect, it} from 'vitest';
import {FOOD_MENU_ITEMS} from './foodData';
import {DRINKS_MENU_ITEMS} from './drinksData';
import {FOOD_SETS} from './setsData';

describe('menu data integrity', () => {
  const all = [...FOOD_MENU_ITEMS, ...DRINKS_MENU_ITEMS];

  it('has unique ids across food and drinks', () => {
    const ids = all.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('tags every item with the right type', () => {
    expect(FOOD_MENU_ITEMS.every((i) => i.type === 'food')).toBe(true);
    expect(DRINKS_MENU_ITEMS.every((i) => i.type === 'drink')).toBe(true);
  });

  it('has positive whole-rupiah prices, valid ratings and non-empty text', () => {
    for (const item of all) {
      expect(Number.isInteger(item.price) && item.price > 0, item.id).toBe(true);
      expect(item.rating >= 0 && item.rating <= 5, item.id).toBe(true);
      expect(item.reviewsCount >= 0, item.id).toBe(true);
      expect(item.name.trim().length, item.id).toBeGreaterThan(0);
      expect(item.description.trim().length, item.id).toBeGreaterThan(0);
      expect(item.image.startsWith('https://'), item.id).toBe(true);
    }
  });

  it('matches the item counts shown on the landing screen', () => {
    expect(FOOD_MENU_ITEMS).toHaveLength(12);
    expect(DRINKS_MENU_ITEMS).toHaveLength(12);
  });
});

describe('set data integrity', () => {
  // Some options have a negative extraPrice on purpose (a cheaper variant), so the
  // invariant is that the cheapest possible combination still costs something.
  it('never prices the cheapest combination at or below zero', () => {
    const cheapest = (opts: {extraPrice: number}[]) => Math.min(...opts.map((o) => o.extraPrice));
    for (const set of FOOD_SETS) {
      const total =
        set.basePrice + cheapest(set.mains) + cheapest(set.sides) + cheapest(set.drinks);
      expect(total, set.id).toBeGreaterThan(0);
    }
  });

  it('has unique set ids and sane prices', () => {
    const ids = FOOD_SETS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const set of FOOD_SETS) {
      expect(set.basePrice, set.id).toBeGreaterThan(0);
      expect(set.originalPrice, set.id).toBeGreaterThanOrEqual(set.basePrice);
    }
  });

  it('offers at least one main, side and drink per set, with unique option ids', () => {
    for (const set of FOOD_SETS) {
      expect(set.mains.length, set.id).toBeGreaterThan(0);
      expect(set.sides.length, set.id).toBeGreaterThan(0);
      expect(set.drinks.length, set.id).toBeGreaterThan(0);
      for (const group of [set.mains, set.sides, set.drinks]) {
        const ids = group.map((o) => o.id);
        expect(new Set(ids).size, set.id).toBe(ids.length);
        expect(group.every((o) => Number.isInteger(o.extraPrice)), set.id).toBe(true);
      }
    }
  });
});

import {describe, expect, it} from 'vitest';
import {searchItems} from './search';
import {FOOD_MENU_ITEMS} from '../data/foodData';
import {DRINKS_MENU_ITEMS} from '../data/drinksData';
import {FOOD_SETS} from '../data/setsData';

describe('searchItems', () => {
  const items = [
    {name: 'Truffle Burger', description: 'Brioche bun', category: 'Burger'},
    {name: 'Matcha Latte', description: 'Uji green tea', category: 'Matcha'},
  ];

  it('matches nothing for an empty or whitespace query', () => {
    expect(searchItems(items, '')).toEqual([]);
    expect(searchItems(items, '   ')).toEqual([]);
  });

  it('is case-insensitive and trims the query', () => {
    expect(searchItems(items, '  TRUFFLE ')).toEqual([items[0]]);
  });

  it('searches name, category and description', () => {
    expect(searchItems(items, 'matcha')).toEqual([items[1]]);
    expect(searchItems(items, 'brioche')).toEqual([items[0]]);
    expect(searchItems(items, 'burger')).toEqual([items[0]]);
  });

  it('returns nothing when no field matches', () => {
    expect(searchItems(items, 'zzzz')).toEqual([]);
  });

  it('works on the real menu data', () => {
    expect(searchItems(FOOD_MENU_ITEMS, 'truffle').length).toBeGreaterThan(0);
    expect(searchItems(DRINKS_MENU_ITEMS, 'matcha').length).toBeGreaterThan(0);
    expect(searchItems(FOOD_SETS, 'feast').length).toBeGreaterThan(0);
  });
});

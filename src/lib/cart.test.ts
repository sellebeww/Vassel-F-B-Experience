import {describe, expect, it} from 'vitest';
import type {CartItem} from '../types';
import {
  SERVICE_FEE_RATE,
  addCartItem,
  changeCartQuantity,
  computeCartTotals,
  createCartItemId,
  parseStoredCart,
  removeCartItem,
} from './cart';

const line = (overrides: Partial<CartItem> = {}): CartItem => ({
  cartItemId: 'a',
  itemType: 'food',
  name: 'Item',
  image: '',
  unitPrice: 10000,
  quantity: 1,
  totalPrice: 10000,
  ...overrides,
});

describe('createCartItemId', () => {
  it('is deterministic for a given clock and random source', () => {
    expect(createCartItemId(1700000000000, () => 0.5)).toBe('ci-1700000000000-i');
  });

  it('differs when the random source differs', () => {
    expect(createCartItemId(1, () => 0.1)).not.toBe(createCartItemId(1, () => 0.9));
  });
});

describe('addCartItem', () => {
  it('appends with the given id and does not mutate the input', () => {
    const cart = [line()];
    const {cartItemId: _omit, ...data} = line({name: 'New'});
    const next = addCartItem(cart, data, 'b');
    expect(next).toHaveLength(2);
    expect(next[1]).toMatchObject({name: 'New', cartItemId: 'b'});
    expect(cart).toHaveLength(1);
  });
});

describe('changeCartQuantity', () => {
  it('increases quantity and recomputes the line total', () => {
    const next = changeCartQuantity([line({unitPrice: 25000, totalPrice: 25000})], 'a', 2);
    expect(next[0].quantity).toBe(3);
    expect(next[0].totalPrice).toBe(75000);
  });

  it('removes the line when quantity reaches zero', () => {
    expect(changeCartQuantity([line()], 'a', -1)).toEqual([]);
  });

  it('removes the line when quantity would go negative', () => {
    expect(changeCartQuantity([line()], 'a', -5)).toEqual([]);
  });

  it('leaves other lines untouched and ignores unknown ids', () => {
    const cart = [line(), line({cartItemId: 'b'})];
    const next = changeCartQuantity(cart, 'zzz', 1);
    expect(next).toEqual(cart);
  });
});

describe('removeCartItem', () => {
  it('removes only the matching line', () => {
    const next = removeCartItem([line(), line({cartItemId: 'b'})], 'a');
    expect(next.map((i) => i.cartItemId)).toEqual(['b']);
  });
});

describe('computeCartTotals', () => {
  it('returns zeros for an empty cart', () => {
    expect(computeCartTotals([])).toEqual({count: 0, subtotal: 0, serviceFee: 0, total: 0});
  });

  it('sums quantities and totals and adds the 5% service fee', () => {
    const cart = [
      line({quantity: 2, unitPrice: 68000, totalPrice: 136000}),
      line({cartItemId: 'b', quantity: 1, unitPrice: 48000, totalPrice: 48000}),
    ];
    expect(SERVICE_FEE_RATE).toBe(0.05);
    expect(computeCartTotals(cart)).toEqual({
      count: 3,
      subtotal: 184000,
      serviceFee: 9200,
      total: 193200,
    });
  });

  it('rounds the service fee to a whole rupiah', () => {
    const totals = computeCartTotals([line({quantity: 1, totalPrice: 10010})]);
    expect(totals.serviceFee).toBe(501); // 500.5 rounds up
    expect(totals.total).toBe(10511);
  });
});

describe('parseStoredCart', () => {
  it('returns an empty cart for null, junk or non-array JSON', () => {
    expect(parseStoredCart(null)).toEqual([]);
    expect(parseStoredCart('')).toEqual([]);
    expect(parseStoredCart('not json')).toEqual([]);
    expect(parseStoredCart('{"a":1}')).toEqual([]);
  });

  it('round-trips a saved cart', () => {
    const cart = [line()];
    expect(parseStoredCart(JSON.stringify(cart))).toEqual(cart);
  });
});

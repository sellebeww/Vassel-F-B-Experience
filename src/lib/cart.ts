import type { CartItem } from '../types';

/** Service fee charged on top of the subtotal (5%). */
export const SERVICE_FEE_RATE = 0.05;

export interface CartTotals {
  count: number;
  subtotal: number;
  serviceFee: number;
  total: number;
}

/** Builds a unique-enough id for a cart line. Time and randomness are injectable for tests. */
export function createCartItemId(
  now: number = Date.now(),
  random: () => number = Math.random,
): string {
  return `ci-${now}-${random().toString(36).slice(2, 8)}`;
}

export function addCartItem(
  cart: CartItem[],
  item: Omit<CartItem, 'cartItemId'>,
  cartItemId: string,
): CartItem[] {
  return [...cart, { ...item, cartItemId }];
}

/** Changes a line's quantity by `delta`. A quantity of 0 or less removes the line. */
export function changeCartQuantity(
  cart: CartItem[],
  cartItemId: string,
  delta: number,
): CartItem[] {
  const next: CartItem[] = [];
  for (const item of cart) {
    if (item.cartItemId !== cartItemId) {
      next.push(item);
      continue;
    }
    const quantity = item.quantity + delta;
    if (quantity <= 0) continue;
    next.push({ ...item, quantity, totalPrice: item.unitPrice * quantity });
  }
  return next;
}

export function removeCartItem(cart: CartItem[], cartItemId: string): CartItem[] {
  return cart.filter((item) => item.cartItemId !== cartItemId);
}

export function computeCartTotals(cart: CartItem[]): CartTotals {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE);
  return { count, subtotal, serviceFee, total: subtotal + serviceFee };
}

/** Reads a saved cart. Anything that is not an array of objects is treated as empty. */
export function parseStoredCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

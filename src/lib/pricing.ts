import type { DrinkCustomization, FoodCustomization } from '../types';

/** Surcharge in rupiah for each food size option. */
export const FOOD_SIZE_SURCHARGE: Record<FoodCustomization['size'], number> = {
  Regular: 0,
  'Double Patty': 24000,
  Upsize: 15000,
};

/** Surcharge in rupiah for each drink size option. */
export const DRINK_SIZE_SURCHARGE: Record<DrinkCustomization['size'], number> = {
  Regular: 0,
  Large: 6000,
};

/** Sums the price of the selected option ids; ids that are not in `options` count as 0. */
export function sumSelectedPrices(
  selectedIds: string[],
  options: ReadonlyArray<{ id: string; price: number }>,
): number {
  return selectedIds.reduce((sum, id) => sum + (options.find((o) => o.id === id)?.price ?? 0), 0);
}

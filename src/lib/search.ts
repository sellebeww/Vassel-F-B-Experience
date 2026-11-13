export interface Searchable {
  name: string;
  description: string;
  category?: string;
  subtitle?: string;
}

/**
 * Case-insensitive substring search over name, category, subtitle and description.
 * An empty or whitespace-only query matches nothing.
 */
export function searchItems<T extends Searchable>(items: readonly T[], query: string): T[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return items.filter((item) =>
    [item.name, item.category, item.subtitle, item.description].some(
      (field) => field !== undefined && field.toLowerCase().includes(q),
    ),
  );
}

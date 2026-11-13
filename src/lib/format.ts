/**
 * Formats an integer amount with "." as the thousands separator, matching the
 * `id-ID` convention used across the UI (for example 68000 -> "68.000").
 * Implemented by hand so the output never depends on the ICU data, locale or
 * time zone of the machine running it.
 */
export function formatNumberId(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? '-' : '';
  const digits = String(Math.abs(rounded));
  return sign + digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

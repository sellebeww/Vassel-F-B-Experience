/**
 * Returns the same Unsplash photo requested at `width` pixels wide. URLs that are
 * not Unsplash image URLs, or that have no `w` parameter, are returned unchanged.
 */
export function withImageWidth(url: string, width: number): string {
  if (!url.startsWith('https://images.unsplash.com/')) return url;
  if (!/[?&]w=\d+/.test(url)) return url;
  return url.replace(/([?&])w=\d+/, `$1w=${width}`);
}

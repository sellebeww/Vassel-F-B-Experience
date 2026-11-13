import type {Page} from '@playwright/test';

// 1x1 transparent PNG, so layout tests never depend on the network.
const PIXEL = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
  'base64',
);

/**
 * Keeps the suite deterministic: the app hot-links photos from Unsplash and fonts
 * from Google Fonts. Both are replaced by local stand-ins and every other external
 * request is aborted, so the test never depends on (or fails because of) the network.
 */
export async function stubExternalNetwork(page: Page): Promise<void> {
  await page.route(/^https?:\/\/(?!localhost|127\.0\.0\.1)/, (route) => {
    const type = route.request().resourceType();
    if (type === 'image') return route.fulfill({status: 200, contentType: 'image/png', body: PIXEL});
    if (type === 'stylesheet') return route.fulfill({status: 200, contentType: 'text/css', body: ''});
    if (type === 'font') return route.fulfill({status: 200, contentType: 'font/woff2', body: ''});
    return route.abort();
  });
}

/** Collects anything the app itself reports as a console error/warning or uncaught exception. */
export function collectProblems(page: Page): string[] {
  const problems: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      problems.push(`console.${msg.type()}: ${msg.text()}`);
    }
  });
  page.on('pageerror', (err) => problems.push(`pageerror: ${err.message}`));
  return problems;
}

/** Elements whose box pokes out of the viewport on the right and are not clipped by any scroll or clip container. */
export function findHorizontalLeaks(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const limit = document.documentElement.clientWidth + 0.5;
    const clipped = (el: Element): boolean => {
      for (let p = el.parentElement; p && p !== document.documentElement; p = p.parentElement) {
        const ox = getComputedStyle(p).overflowX;
        if (ox !== 'visible') return true;
      }
      return false;
    };
    const leaks: string[] = [];
    for (const el of Array.from(document.body.querySelectorAll('*'))) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (getComputedStyle(el).visibility === 'hidden') continue;
      if (r.right > limit && !clipped(el)) {
        const cls = String((el as HTMLElement).className || '').slice(0, 50);
        leaks.push(`${el.tagName.toLowerCase()}.${cls} right=${Math.round(r.right)}`);
      }
    }
    return leaks;
  });
}

export function documentOverflow(page: Page): Promise<{scrollWidth: number; clientWidth: number}> {
  return page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
}

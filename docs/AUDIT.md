# Audit

Baseline taken on branch `improve/safe-quality` before any change (Node 22, `npm ci`).

| Check | Result |
| --- | --- |
| `npm ci` | OK |
| `npm run lint` (`tsc --noEmit`) | OK, 0 errors |
| Tests | none existed |
| `npm run build` | OK, single JS chunk of 505 kB (143 kB gzip), Vite warns it is over 500 kB |
| CI | none existed |

Findings were gathered by reading the source and by driving the production build
with Playwright Chromium at 360 px and 1280 px wide. Each item has a status in the
last column: **fixed** (in this branch), **open** (documented, not changed) or
**decision** (needs the owner).

## Bugs

| # | Finding | Evidence | Status |
| --- | --- | --- | --- |
| B1 | At 360 px the navbar's right-hand cluster ends at x=370, so the hamburger button is cut off at the screen edge. | Playwright: `getBoundingClientRect().right` is 370 for the button and its container; screenshot confirms the clipped button. | fixed |
| B2 | Horizontal overflow is hidden, not solved. `App.tsx` wraps everything in `overflow-x-clip`, which masks overflowing decorative glows (up to x=384 at 360 px) and the navbar overflow above. | Playwright: several elements have `right > viewport width` while `scrollWidth` still equals 360. | fixed |
| B3 | The cart drawer, search, checkout and product modals do not close on Escape. | Playwright: pressing Escape leaves `#cart-drawer-overlay` open and it intercepts clicks. | fixed |
| B4 | `animate-spin-slow` (landing logo) is not defined anywhere, so the class does nothing. | `grep` finds no definition in CSS or Tailwind config. | open (cosmetic, no behaviour change wanted) |

## Accessibility

| # | Finding | Status |
| --- | --- | --- |
| A1 | The two choice cards on the landing screen are `div`s with `onClick` only. They cannot be reached or activated with the keyboard. | fixed |
| A2 | Modals and drawers have no `role="dialog"`, `aria-modal` or accessible name. | fixed |
| A3 | Many icon-only buttons have no accessible name (close, quantity plus/minus, remove, quick add). Only 3 of 59 buttons had an `aria-label`. | fixed |
| A4 | Category filter buttons do not expose their selected state. | fixed |
| A5 | There is no visible keyboard focus style on most controls (`focus:outline-none` without a replacement). | fixed (global `:focus-visible` ring) |
| A6 | No `prefers-reduced-motion` handling. Infinite animations (hero drift, bounce arrows, spinners) and smooth scrolling always run. | fixed |
| A7 | Some small text was below 4.5:1 on its background: `text-white/40` (3.79:1) and `text-stone-500` (4.11:1). | fixed for those captions; the brand accent is a **decision** (see below) |
| A8 | Focus was not trapped inside modals and not restored on close. | fixed (`useDialog`) |

### Contrast

Computed contrast ratios (WCAG formula): white at 40 percent opacity on `#0e0c0b` is
3.79:1, at 50 percent 5.34:1, at 60 percent 7.28:1. `stone-500` on `#0d0a08` is 4.11:1.
Those small captions were raised to `white/60` and `stone-400`.

Left unchanged because it is a brand colour decision: white text on the food accent
`#c95d2c` is 4.13:1 (fails AA for small text; passes for large text), used on buttons
and small badges. Darkening the accent to about `#b54f20` (5.12:1, already the hover
colour) would pass. White on the drinks accent `#3e6f4f` is 5.85:1 and passes.
Text placed over photos cannot be judged reliably without the photos and was not assessed.

## Performance

| # | Finding | Status |
| --- | --- | --- |
| P1 | Every menu card, set card and cart thumbnail requests the 1200 px wide version of its photo even when shown at 80 to 400 px. | fixed (width chosen per use) |
| P2 | Below-the-fold images were not lazy-loaded (only the two menu grids were). | fixed |
| P3 | One 505 kB JS chunk (React, motion, lucide, all views and modals). | open: route-level `React.lazy` would help but was judged outside "safe mode" |
| P4 | All photos are hot-linked from Unsplash. No local fallback, no `width`/`height`, so layout can shift as images arrive. | open |
| P5 | Fonts are loaded from Google Fonts with `display=swap` and `preconnect`. Fine. | n/a |

## Responsive (360 px)

After fixing B1 and B2, `document.documentElement.scrollWidth` equals the viewport
width at 360 px on the landing screen, the food view, the drinks view and with the
cart open, **with `overflow-x-clip` removed from the app wrapper**. The horizontal
category chip rows are intentional scroll containers (`no-scrollbar`) and are not
counted as page overflow. This is enforced by the e2e tests.

## SEO and metadata

| # | Finding | Status |
| --- | --- | --- |
| S1 | `<title>`, description and `og:title`/`og:description` already exist. | n/a |
| S2 | Missing `og:site_name`, `og:locale`, `twitter:title`, `twitter:description`, `theme-color`. | fixed |
| S3 | No `og:image`, `og:url`, canonical link or favicon. These need the real deployed URL and brand assets. | `TODO(vassel)` in `index.html` |
| S4 | The app is a client-rendered SPA: the HTML shell has no content for crawlers, only a `<div id="root">`. | open (needs SSR or prerender, a framework-level change) |
| S5 | No `robots.txt` or sitemap. Not needed for a single view without routes. | open |

## Content and consistency (owner decisions)

* The product is called "Craving Studio" in the page title and UI, "CRAVING" in the
  navbar, and "Vassel F&B Experience" in the README and `package.json`. The README
  now explains both names; which one is public-facing is your call.
* The cart is stored in `localStorage` under `cravings_studio_cart`.
* Checkout is a front-end simulation only: there is no backend, no payment and the
  order id is random. The README states this limitation.
* All menu items, prices, ratings, review counts, the "Est. 2026" badge and the
  "12 Gourmet Items" / "12 Specialty Brews" counters are existing content. The
  counters do match the data (12 food items, 12 drinks). Nothing was invented or changed.
* Some UI strings hard-code price deltas (for example "+Rp 24.000" for Double Patty,
  "+Rp 6.000" for Large). They are not derived from the same constants as the
  calculation. Unit tests pin the current values so a divergence is caught.

## Tests

No tests existed. This branch adds Vitest unit tests for the pure logic (cart
operations and totals, price and image helpers, menu data integrity) and a
Playwright smoke suite (page loads, navigation between the two worlds, no console
errors from the app itself, no horizontal scroll at 360 px).

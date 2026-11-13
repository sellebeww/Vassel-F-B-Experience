import {expect, test} from '@playwright/test';
import {documentOverflow, findHorizontalLeaks, stubExternalNetwork} from './helpers';

test.use({viewport: {width: 360, height: 740}});

test.beforeEach(async ({page}) => {
  await stubExternalNetwork(page);
});

async function expectNoHorizontalScroll(page: import('@playwright/test').Page) {
  const {scrollWidth, clientWidth} = await documentOverflow(page);
  expect(scrollWidth, 'document scrollWidth').toBeLessThanOrEqual(clientWidth);
  expect(await findHorizontalLeaks(page), 'elements leaking past the right edge').toEqual([]);
}

test('landing screen has no horizontal scroll at 360px', async ({page}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', {level: 1})).toBeVisible();
  await expectNoHorizontalScroll(page);
});

test('food world has no horizontal scroll at 360px and the menu button is reachable', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', {name: /explore food/i}).click();
  await expect(page.getByText('Artisanal Dining', {exact: true})).toBeVisible();
  await expectNoHorizontalScroll(page);

  const box = await page.getByRole('button', {name: 'Toggle menu'}).boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x + box!.width).toBeLessThanOrEqual(360);
});

test('drinks world has no horizontal scroll at 360px', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', {name: /explore drinks/i}).click();
  await expect(page.getByText('Specialty Drinks', {exact: true})).toBeVisible();
  await expectNoHorizontalScroll(page);
});

test('mobile menu opens and switches world at 360px', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', {name: /explore food/i}).click();
  await page.getByRole('button', {name: 'Toggle menu'}).click();
  await page.locator('#main-navbar').getByRole('button', {name: /switch to drinks experience/i}).click();
  await expect(page.getByText('Specialty Drinks', {exact: true})).toBeVisible();
  await expectNoHorizontalScroll(page);
});

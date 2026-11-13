import {expect, test} from '@playwright/test';
import {collectProblems, stubExternalNetwork} from './helpers';

test.beforeEach(async ({page}) => {
  await stubExternalNetwork(page);
});

test('landing screen loads with both worlds on offer', async ({page}) => {
  const problems = collectProblems(page);
  await page.goto('/');
  await expect(page).toHaveTitle(/Craving Studio/);
  await expect(page.getByRole('heading', {level: 1, name: 'What are you craving today?'})).toBeVisible();
  await expect(page.getByRole('button', {name: /explore food/i})).toBeVisible();
  await expect(page.getByRole('button', {name: /explore drinks/i})).toBeVisible();
  expect(problems).toEqual([]);
});

test('navigates between the food and drinks worlds and back to the selector', async ({page}) => {
  const problems = collectProblems(page);
  await page.goto('/');

  await page.getByRole('button', {name: /explore food/i}).click();
  await expect(page.getByText('BISTRO', {exact: true})).toBeVisible();
  await expect(page.locator('#menu')).toBeAttached();

  await page.locator('#btn-switch-experience').click();
  await expect(page.getByText('MATCHA BAR', {exact: true})).toBeVisible();

  await page.locator('#btn-switch-experience').click();
  await expect(page.getByText('BISTRO', {exact: true})).toBeVisible();

  await page.getByTitle('Return to Experience Selector').click();
  await expect(page.getByRole('heading', {level: 1, name: 'What are you craving today?'})).toBeVisible();

  await page.getByRole('button', {name: /explore drinks/i}).click();
  await expect(page.getByText('MATCHA BAR', {exact: true})).toBeVisible();

  expect(problems).toEqual([]);
});

test('a dish can be added to the cart and totals follow', async ({page}) => {
  const problems = collectProblems(page);
  await page.goto('/');
  await page.getByRole('button', {name: /explore food/i}).click();
  await expect(page.locator('#btn-nav-cart')).toContainText('0');

  await page.getByRole('button', {name: /quick add/i}).first().click();
  await expect(page.locator('#btn-nav-cart')).toContainText('1');

  await page.locator('#btn-nav-cart').click();
  const drawer = page.getByRole('dialog', {name: /cart/i});
  await expect(drawer).toBeVisible();
  await expect(drawer.getByText(/^Rp /).first()).toBeVisible();
  expect(problems).toEqual([]);
});

test('Escape closes the cart drawer and the search dialog', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', {name: /explore food/i}).click();

  await page.locator('#btn-nav-cart').click();
  await expect(page.getByRole('dialog', {name: /cart/i})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', {name: /cart/i})).toBeHidden();

  await page.locator('#btn-nav-search').click();
  await expect(page.getByRole('dialog', {name: /search/i})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', {name: /search/i})).toBeHidden();
});

test('the experience cards work from the keyboard', async ({page}) => {
  await page.goto('/');
  const food = page.getByRole('button', {name: /explore food/i});
  await food.focus();
  await expect(food).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByText('BISTRO', {exact: true})).toBeVisible();
});

test.describe('reduced motion', () => {
  test.use({reducedMotion: 'reduce'});

  test('disables smooth scrolling and infinite CSS animations', async ({page}) => {
    await page.goto('/');
    await page.getByRole('button', {name: /explore food/i}).click();
    await expect(page.getByText('BISTRO', {exact: true})).toBeVisible();
    const behavior = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
    expect(behavior).toBe('auto');
    const infinite = await page.evaluate(() =>
      document
        .getAnimations()
        .filter((a) => a instanceof CSSAnimation && a.effect?.getComputedTiming().iterations === Infinity)
        .map((a) => (a as CSSAnimation).animationName),
    );
    expect(infinite).toEqual([]);
  });
});

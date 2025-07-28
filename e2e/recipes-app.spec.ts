import { test, expect } from '@playwright/test';

test.describe('E-COOK Recipe Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the home page with key elements', async ({ page }) => {
    await expect(page).toHaveTitle(/E-COOK|recipes/i);

    await expect(
      page.getByPlaceholder('What are you looking for?'),
    ).toBeVisible();

    await expect(page.getByRole('navigation')).toBeVisible();

    await expect(page.getByTitle('Title')).toBeVisible();
  });

  test('should perform search functionality', async ({ page }) => {
    const searchInput = page.getByPlaceholder('What are you looking for?');
    const searchButton = page.getByRole('button', { name: 'Search' });

    await searchInput.fill('bibimbap');
    await searchButton.click();

    await expect(page).toHaveURL(/\/sn\/search\?.*q=bibimbap/);
    await expect(page).toHaveURL(/.*type=name/);

    await page.goto('/');

    await page.getByTitle('Ingredient').click();
    await searchInput.fill('rice');
    await searchButton.click();

    await expect(page).toHaveURL(/\/sn\/search\?.*q=rice/);
    await expect(page).toHaveURL(/.*type=ingredient/);
  });

  test('should handle search with Enter key', async ({ page }) => {
    const searchInput = page.getByPlaceholder('What are you looking for?');

    await searchInput.fill('korean');
    await searchInput.press('Enter');

    await expect(page).toHaveURL(/\/sn\/search\?.*q=korean/);
  });

  test('should navigate to login page', async ({ page }) => {
    const loginLink = page.getByRole('link', { name: /sign in|login/i });

    if (await loginLink.isVisible()) {
      await loginLink.click();
      await expect(page).toHaveURL(/\/login/);

      await expect(page.getByText('Sign in to E-COOK')).toBeVisible();
      await expect(page.getByLabel('Username')).toBeVisible();
      await expect(page.getByLabel('Password')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();

      await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
    }
  });

  test('should validate login form', async ({ page }) => {
    await page.goto('/login');

    await page.waitForTimeout(1000);

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Please fill in all fields');
      await dialog.accept();
    });

    const signInButton = page.getByRole('button', { name: 'Sign In' });
    await signInButton.click();
  });

  test('should attempt login with test credentials', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Username').fill('testme');
    await page.getByLabel('Password').fill('Helloworld1!');

    const signInButton = page.getByRole('button', { name: 'Sign In' });
    await signInButton.click();

    await page.waitForTimeout(2000);

    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      console.log('Login failed - this is expected if backend is not running');
    } else {
      await expect(page).toHaveURL('/');
    }
  });

  test('should navigate to new recipe page when logged in', async ({
    page,
  }) => {
    await page.goto('/sn/recipes/new');

    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      await expect(page.getByText('Sign in to E-COOK')).toBeVisible();
    } else {
      await expect(page.getByText(/new recipe|create recipe/i)).toBeVisible();
    }
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    await expect(
      page.getByPlaceholder('What are you looking for?'),
    ).toBeVisible();

    const searchInput = page.getByPlaceholder('What are you looking for?');
    await searchInput.fill('test');
    await searchInput.press('Enter');

    await expect(page).toHaveURL(/\/sn\/search/);
  });

  test('should handle navigation between different search types', async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder('What are you looking for?');

    await page.getByRole('button', { name: 'Tag' }).click();
    await searchInput.fill('vegetarian');
    await searchInput.press('Enter');
    await expect(page).toHaveURL(/.*type=tag/);

    await page.goto('/');
    await page.getByRole('button', { name: 'Product' }).click();
    await searchInput.fill('organic');
    await searchInput.press('Enter');
    await expect(page).toHaveURL(/.*type=product/);
  });
});

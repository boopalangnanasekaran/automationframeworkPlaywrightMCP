import { test, expect } from '@playwright/test';

test('loads the OrangeHRM login page and displays login controls', async ({ page }) => {
  await page.goto('/web/index.php/auth/login');

  await expect(page).toHaveTitle(/OrangeHRM/);
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

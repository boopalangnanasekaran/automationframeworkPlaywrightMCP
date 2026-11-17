import 'dotenv/config';
import { test, expect } from '../fixtures/baseFixtures';
import { getOrangeHrmData } from '../utils/testData';

test.describe('OrangeHRM login functionality', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('logs in successfully with valid credentials', async ({ page, loginPage, logger }) => {
    const data = getOrangeHrmData();

    try {
      await loginPage.login(data.username, data.password);

      await expect(page).toHaveURL(/dashboard\/index/);
      await expect(page.locator('.oxd-topbar-header')).toBeVisible();
      logger.info('Valid credentials logged in successfully');
    } catch (error) {
      logger.error(`Valid login failed at ${page.url()}`, error);
      throw error;
    }
  });

  test('shows an error for invalid credentials', async ({ page, logger }) => {
    try {
      await page.getByPlaceholder('Username').fill('InvalidUser');
      await page.getByPlaceholder('Password').fill('WrongPassword');
      await page.getByRole('button', { name: 'Login' }).click();

      await expect(page.getByText('Invalid credentials')).toBeVisible();
      await expect(page).toHaveURL(/auth\/login/);
      logger.info('Invalid credentials error was displayed');
    } catch (error) {
      logger.error(`Invalid credentials test failed at ${page.url()}`, error);
      throw error;
    }
  });

  test('shows required errors when username and password are empty', async ({ page, logger }) => {
    try {
      await page.getByRole('button', { name: 'Login' }).click();

      await expect(page.getByText('Required', { exact: true }).first()).toBeVisible();
      await expect(page.getByText('Required', { exact: true }).nth(1)).toBeVisible();
      await expect(page).toHaveURL(/auth\/login/);
      logger.info('Required field errors were displayed for empty credentials');
    } catch (error) {
      logger.error(`Empty credentials test failed at ${page.url()}`, error);
      throw error;
    }
  });

  test('shows required error when password is empty', async ({ page, logger }) => {
    const data = getOrangeHrmData();

    try {
      await page.getByPlaceholder('Username').fill(data.username);
      await page.getByRole('button', { name: 'Login' }).click();

      await expect(page.getByText('Required', { exact: true })).toBeVisible();
      await expect(page).toHaveURL(/auth\/login/);
      logger.info('Required password error was displayed');
    } catch (error) {
      logger.error(`Empty password test failed at ${page.url()}`, error);
      throw error;
    }
  });

  test('shows required error when username is empty', async ({ page, logger }) => {
    const data = getOrangeHrmData();

    try {
      await page.getByPlaceholder('Password').fill(data.password);
      await page.getByRole('button', { name: 'Login' }).click();

      await expect(page.getByText('Required', { exact: true })).toBeVisible();
      await expect(page).toHaveURL(/auth\/login/);
      logger.info('Required username error was displayed');
    } catch (error) {
      logger.error(`Empty username test failed at ${page.url()}`, error);
      throw error;
    }
  });
});

import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { Logger } from '../utils/logger';

export class LoginPage extends BasePage {
  constructor(page: Page, logger: Logger) {
    super(page, logger);
  }

  async open(): Promise<void> {
    this.logger.step('Opening OrangeHRM login page');
    await this.page.goto('/web/index.php/auth/login');
    await expect(this.page.getByRole('heading', { name: 'Login' })).toBeVisible({ timeout: 30_000 });
  }

  async login(username: string, password: string): Promise<void> {
    await this.safeFill(this.page.getByPlaceholder('Username'), username, 'username');
    await this.safeFill(this.page.getByPlaceholder('Password'), password, 'password');
    await this.safeClick(this.page.getByRole('button', { name: 'Login' }), 'Login');
    await expect(this.page.locator('.oxd-topbar-header')).toBeVisible({ timeout: 30_000 });
  }
}

import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { Logger } from '../utils/logger';

export class PimPage extends BasePage {
  constructor(page: Page, logger: Logger) {
    super(page, logger);
  }

  async openEmployeeList(): Promise<void> {
    await this.safeClick(this.page.getByText('PIM', { exact: true }).first(), 'PIM menu');
    await expect(this.page).toHaveURL(/.*pim\/viewEmployeeList/, { timeout: 30_000 });
  }

  async addEmployee(firstName: string, middleName: string, lastName: string): Promise<void> {
    await this.safeClick(this.page.getByRole('button', { name: 'Add' }), 'Add employee');
    await this.safeFill(this.page.getByPlaceholder('First Name'), firstName, 'first name');
    await this.safeFill(this.page.getByPlaceholder('Middle Name'), middleName, 'middle name');
    await this.safeFill(this.page.getByPlaceholder('Last Name'), lastName, 'last name');
    await this.safeClick(this.page.getByRole('button', { name: 'Save' }), 'Save employee');
  }

  async verifyEmployeeCreated(fullName: string): Promise<void> {
    await expect(this.page.getByText(fullName, { exact: true }).first()).toBeVisible({ timeout: 30_000 });
  }
}

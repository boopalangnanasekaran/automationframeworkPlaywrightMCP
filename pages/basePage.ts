import { Locator, Page } from '@playwright/test';
import { Logger } from '../utils/logger';

export abstract class BasePage {
  constructor(protected readonly page: Page, protected readonly logger: Logger) {}

  async waitForReady(locator: Locator, state: 'visible' | 'attached' = 'visible'): Promise<void> {
    await locator.waitFor({ state, timeout: 30_000 });
  }

  async safeClick(locator: Locator, description: string): Promise<void> {
    this.logger.step(`Clicking ${description}`);
    await locator.waitFor({ state: 'visible', timeout: 30_000 });
    await locator.click();
  }

  async safeFill(locator: Locator, value: string, description: string): Promise<void> {
    this.logger.step(`Entering ${description}: ${value}`);
    await locator.waitFor({ state: 'visible', timeout: 30_000 });
    await locator.fill(value);
  }
}

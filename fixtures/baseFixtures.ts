import { test as base } from '@playwright/test';
import { Logger } from '../utils/logger';
import { LoginPage } from '../pages/loginPage';
import { PimPage } from '../pages/pimPage';

export type FrameworkFixtures = {
  logger: Logger;
  loginPage: LoginPage;
  pimPage: PimPage;
};

export const test = base.extend<FrameworkFixtures>({
  logger: async ({}, use, testInfo) => {
    await use(new Logger(testInfo.title));
  },
  loginPage: async ({ page, logger }, use) => {
    await use(new LoginPage(page, logger));
  },
  pimPage: async ({ page, logger }, use) => {
    await use(new PimPage(page, logger));
  },
});

export { expect } from '@playwright/test';

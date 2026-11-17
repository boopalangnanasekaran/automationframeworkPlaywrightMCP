import { Locator, Page } from '@playwright/test';

export class LocatorHelper {
  constructor(private readonly page: Page) {}

  async locateText(text: string, role?: 'button' | 'link'): Promise<Locator> {
    if (role) return this.page.getByRole(role, { name: text, exact: true });
    return this.page.getByText(text, { exact: true });
  }

  locateByLabel(label: string): Locator {
    return this.page.getByLabel(label, { exact: true });
  }

  locateByPlaceholder(placeholder: string): Locator {
    return this.page.getByPlaceholder(placeholder, { exact: true });
  }

  async clickWithFallback(primary: Locator, fallbackText: string, role: 'button' | 'link'): Promise<void> {
    if (await primary.count()) {
      await primary.first().click();
      return;
    }
    await this.page.getByRole(role, { name: fallbackText, exact: true }).click();
  }
}

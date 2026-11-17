import 'dotenv/config';
import { test, expect } from '../fixtures/baseFixtures';
import { getOrangeHrmData } from '../utils/testData';

test.describe('OrangeHRM employee management', () => {
  test('adds a new employee successfully', async ({ page, loginPage, pimPage, logger }) => {
    const data = getOrangeHrmData();

    try {
      await loginPage.open();
      await loginPage.login(data.username, data.password);
      await pimPage.openEmployeeList();
      await pimPage.addEmployee(data.employee.firstName, data.employee.middleName, data.employee.lastName);

      const fullName = `${data.employee.firstName} ${data.employee.lastName}`;
      await pimPage.verifyEmployeeCreated(fullName);
      logger.info(`Verified employee: ${fullName}`);
      expect(page.url()).toContain('pim');
    } catch (error) {
      logger.error(`Test failed at URL ${page.url()}`, error);
      throw error;
    }
  });
});

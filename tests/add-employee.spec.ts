import 'dotenv/config';
import { test, expect } from '../fixtures/baseFixtures';
import { getOrangeHrmData } from '../utils/testData';

test('logs in and adds a new employee', async ({ page, loginPage, pimPage, logger }) => {
  const data = getOrangeHrmData();

  try {
    await loginPage.open();
    await loginPage.login(data.username, data.password);
    await pimPage.openEmployeeList();

    await pimPage.addEmployee(
      data.employee.firstName,
      data.employee.middleName,
      data.employee.lastName,
    );

    const fullName = `${data.employee.firstName} ${data.employee.lastName}`;
    await pimPage.verifyEmployeeCreated(fullName);

    logger.info(`Successfully added employee: ${fullName}`);
    expect(page.url()).toContain('pim');
  } catch (error) {
    logger.error(`Add employee test failed at ${page.url()}`, error);
    throw error;
  }
});

import orangeHrmData from '../testdata/orangehrm.json';

export function getOrangeHrmData() {
  const suffix = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  return {
    username: process.env.ORANGE_USERNAME ?? orangeHrmData.username,
    password: process.env.ORANGE_PASSWORD ?? orangeHrmData.password,
    employee: {
      firstName: `${orangeHrmData.employee.firstName}_${suffix}`,
      middleName: orangeHrmData.employee.middleName,
      lastName: `${orangeHrmData.employee.lastName}_${suffix}`,
    },
  };
}

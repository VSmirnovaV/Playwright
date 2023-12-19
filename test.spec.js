const { test, expect } = require("@playwright/test");
const user = require('./user')


test.beforeEach(async ({ page }) => {
    await page.goto('https://netology.ru/?modal=sign_in');
    await page.getByRole('heading', { name: 'Вход в личный кабинет' }).isVisible();
  });

test("successful authorization", async ({ page }) => {
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(user.login);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(user.password);
  await page.getByTestId('login-submit-btn').click();
  await page.getByRole('heading', { name: 'Моё обучение' }).isVisible();
  await page.screenshot({ path: 'success.png' });
});

test("unsuccessful authorization", async ({ page }) => {
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(user.invalidLogin);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(user.invalidPassword);
  await page.getByTestId('login-submit-btn').click();
  await page.getByTestId('login-error-hint').isVisible();
  await page.screenshot({ path: 'unsuccessfully.png' });
});
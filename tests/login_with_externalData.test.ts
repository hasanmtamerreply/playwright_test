import { test, expect } from '@playwright/test';
// Import the login data JSON. Adjust the path if your folder structure is different.
import loginData from '../data/loginData.json';

const baseUrl = 'https://practicetestautomation.com/practice-test-login/';

test.describe('Login test with external data', () => {
  
  test('Valid Login', async ({ page }) => {
    await page.goto(baseUrl);
    await page.getByLabel('Username').fill(loginData.validLogin.username);
    await page.getByLabel('Password').fill(loginData.validLogin.password);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText(loginData.validLogin.successMessage)).toBeVisible();
    await page.getByRole('link', { name: 'Log out' }).click();
  });

  test('Invalid Username', async ({ page }) => {
    await page.goto(baseUrl);
    await page.getByLabel('Username').fill(loginData.invalidUsername.username);
    await page.getByLabel('Password').fill(loginData.invalidUsername.password);
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // Wait for the error element and assert that it contains the expected error message.
    await page.waitForSelector('#error');
    const errorText = await page.locator('#error').textContent();
    console.log(`Username error message is shown for user "${loginData.invalidUsername.username}": ${errorText}`);
    await expect(errorText || '').toContain(loginData.invalidUsername.errorMessage);
  });

  test('Invalid Password', async ({ page }) => {
    await page.goto(baseUrl);
    await page.getByLabel('Username').fill(loginData.invalidPassword.username);
    await page.getByLabel('Password').fill(loginData.invalidPassword.password);
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // Wait for the error element and assert that it contains the expected error message.
    await page.waitForSelector('#error');
    const errorText = await page.locator('#error').textContent();
    console.log(`Password error message is shown for user "${loginData.invalidPassword.username}" with password "${loginData.invalidPassword.password}": ${errorText}`);
    await expect(errorText || '').toContain(loginData.invalidPassword.errorMessage);
  });

});

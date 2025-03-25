import { test, expect } from '@playwright/test';

test('login_with_manuel_data', async ({ page }) => {
  // Positive Login Test
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('student');
  await page.locator('#form div').filter({ hasText: 'Password' }).click();
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Assert that success message is displayed for valid login
  await expect(page.getByText('Congratulations student. You successfully logged in!')).toBeVisible();
  
  // Logout after successful login
  await page.getByRole('link', { name: 'Log out' }).click();

  // Invalid Username Test
  const invalidUsername = 'incorrectUser';
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill(invalidUsername);
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Wait for error element and capture its text
  await page.waitForSelector('#error');
  const usernameErrorText = await page.locator('#error').textContent();
  if (usernameErrorText && usernameErrorText.includes('Your username is invalid!')) {
    console.log(`Username error message is shown for user ${invalidUsername}.`);
  } else {
    console.log('Unexpected message for username error: ', usernameErrorText);
  }
  await expect.soft(usernameErrorText).toContain('Your username is invalid!');

  // Invalid Password Test
  // Refresh the page to start a fresh login
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  const validUsername = 'student';
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill(validUsername);
  await page.getByLabel('Password').click();
  const invalidPassword = 'incorrectPassword';
  await page.getByLabel('Password').fill(invalidPassword);
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Wait for error element and capture its text
  await page.waitForSelector('#error');
  const passwordErrorText = await page.locator('#error').textContent();
  if (passwordErrorText && passwordErrorText.includes('Your password is invalid!')) {
    console.log(`Password error message is shown for user ${validUsername} using password ${invalidPassword}.`);
  } else {
    console.log('Unexpected message for password error: ', passwordErrorText);
  }
  await expect.soft(passwordErrorText).toContain('Your password is invalid!');
});

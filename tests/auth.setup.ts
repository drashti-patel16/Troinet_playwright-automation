import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  // 1. Navigate to login
  await page.goto('https://qa.portal.opixiq.com/auth/signin');

  // 2. Perform login steps
  await page.click('//button[@type="button"]');
  await page.fill('//input[@type="email"]', String(process.env.USERNAME));
  await page.click('//input[@type="submit"]');

  await page.fill('//input[@name="passwd"]', String(process.env.PASSWORD)); // Use environment variable for password
  await page.click('//input[@type="submit"]');

  await page.locator('//input[@type="submit"]').click(); //fix the xpath here

  // 3. Wait for tokens to be set in localStorage
  await page.waitForFunction(() => {
    const token = localStorage.getItem('access_token');
    return token !== null; // Wait until access_token is present
  });

  // Optional: Log what was stored (for debugging)
  const storedTokens = await page.evaluate(() => {
    return {
      access_token: localStorage.getItem('access_token'),
      refresh_token: localStorage.getItem('refresh_token'),
      organization_id: localStorage.getItem('organization_id'),
      workspace_id: localStorage.getItem('workspace_id'),
      'data-theme': localStorage.getItem('data-theme'),
    };
  });
  console.log('Stored tokens:', storedTokens);

  // 4. Save the state (Cookies + LocalStorage) to a file
  await page.context().storageState({ path: './.auth/user.json' });
  console.log('Authentication complete - state saved to .auth/user.json');
});
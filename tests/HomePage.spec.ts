import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.use({ storageState: './.auth/user.json' });

test('open QA portal with tokens in localStorage', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://qa.portal.opixiq.com/auth/signin');
    await page.waitForTimeout(20000)
});
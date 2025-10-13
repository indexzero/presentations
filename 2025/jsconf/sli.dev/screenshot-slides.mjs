import { chromium } from 'playwright';

(async () => {
  // Launch browser
  const browser = await chromium.launch({
    headless: false // Set to true if you don't want to see the browser
  });

  // Create a new page
  const page = await browser.newPage();

  // Set viewport to less than 1500px wide
  await page.setViewportSize({ width: 1400, height: 900 });

  // Navigate to localhost:8787
  await page.goto('http://localhost:8787');

  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle');

  // Loop 100 times
  for (let i = 0; i < 100; i++) {
    // Take a screenshot with numbered filename
    const screenshotPath = `dumps/screenshot-${String(i + 1).padStart(3, '0')}.png`;
    await page.screenshot({
      path: screenshotPath,
      fullPage: false // Only capture viewport
    });
    console.log(`Screenshot ${i + 1} saved: ${screenshotPath}`);

    // Press right arrow key
    await page.keyboard.press('ArrowRight');

    // Wait 1 second
    await page.waitForTimeout(1000);
  }

  console.log('Completed 100 screenshots!');

  // Close browser
  await browser.close();
})();
const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Navigating to https://gamma.app/...');
    await page.goto('https://gamma.app/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    // Wait a bit more for any dynamic content to load
    await page.waitForTimeout(3000);

    console.log('Taking full page screenshot...');
    await page.screenshot({
      path: 'gamma-screenshot.png',
      fullPage: true
    });

    console.log('Screenshot saved as gamma-screenshot.png');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
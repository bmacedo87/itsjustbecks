const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

setDefaultTimeout(10 * 60 * 1000);

Before(async function () {
    this.browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
    this.context = await this.browser.newContext({ viewport: null });
    this.page = await this.context.newPage();
});

After(async function () {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});
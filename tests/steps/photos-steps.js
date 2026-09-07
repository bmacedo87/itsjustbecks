const { Given, When, Then } = require('@cucumber/cucumber');
const { SitemapHelper } = require('../../helpers/sitemap-helper');
const { BlogPage } = require('../../pages/blog-page');

Given('I retrieve all blog posts from the sitemap', async function () {
    const sitemapHelper = new SitemapHelper(this.context.request);
    this.postUrls = await sitemapHelper.getPostUrls();
    this.postUrls.forEach(url => console.log(`🔗 ${url}`));
});

When('I check the photos on every blog post', async function () {
    this.brokenPosts = [];

    for (const url of this.postUrls) {
        console.log(`\n🌍 Checking: ${url}`);
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });

        const blogPage = new BlogPage(this.page);

        try {
            await blogPage.checkPostImages();
        } catch (error) {
            this.brokenPosts.push({ url, error: error.message });
        }
    }
});

Then('all blog post photos should load correctly', async function () {
    if (this.brokenPosts.length) throw new Error(`❌ ${this.brokenPosts.length} post(s) contain broken images:\n\n${this.brokenPosts.map(post => `${post.url}\n${post.error}`).join('\n\n')}`);
});
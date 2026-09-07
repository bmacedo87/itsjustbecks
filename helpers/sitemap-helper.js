exports.SitemapHelper = class SitemapHelper {

    constructor(request) {
        this.request = request;
    }

    async getPostUrls() {

        const response = await this.request.get('https://itsjustbecks.com/sitemap-1.xml');
        const xml = await response.text();
        const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);

        console.log(`🔗 Found ${urls.length} URLs in sitemap`);
        
        return urls;
    }
};
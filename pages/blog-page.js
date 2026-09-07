exports.BlogPage = class BlogPage {

    constructor(page) {
        this.page = page;
        this.images = page.locator('.post-thumbnail img, .entry-content.single-content img');
    }

    async checkPostImages() {
        const count = await this.images.count();
        const brokenImages = [];
        let checkedImages = 0;

        for (let i = 0; i < count; i++) {
            const image = this.images.nth(i);
            const isRelatedPost = await image.evaluate(img => !!img.closest('#jp-relatedposts'));
            if (isRelatedPost) continue;

            checkedImages++;
            await image.scrollIntoViewIfNeeded();

            await image.evaluate(img => img.complete ? Promise.resolve() : new Promise(resolve => {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
            }));

            const result = await image.evaluate(img => ({ src: img.currentSrc || img.src, alt: img.alt, complete: img.complete, width: img.naturalWidth, height: img.naturalHeight }));
            const working = result.complete && result.width > 0 && result.height > 0;

            console.log(`${working ? '✅' : '❌'} Image ${checkedImages}: ${result.alt || 'No alt text'} | ${result.src}`);
            if (!working) brokenImages.push(result);
        }

        console.log(`📷 Checked ${checkedImages} images in the post`);

        if (brokenImages.length) throw new Error(`❌ ${brokenImages.length} broken image(s) found:\n${brokenImages.map(img => `${img.alt || 'No alt text'}\n${img.src}`).join('\n\n')}`);
    }
};
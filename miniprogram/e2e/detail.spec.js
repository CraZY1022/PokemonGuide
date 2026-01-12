const automator = require('miniprogram-automator');
const { resolve } = require('path');

describe('Detail Page', () => {
    let miniProgram;
    let page;

    beforeAll(async () => {
        miniProgram = await automator.connect({
            wsEndpoint: 'ws://127.0.0.1:9420',
        });
        // Go to home first
        page = await miniProgram.reLaunch('/pages/home/index');
        await page.waitFor(2000);
    }, 120000);

    afterAll(async () => {
        await miniProgram.disconnect();
    });

    it('D-001: Should navigate to detail page', async () => {
        // Click the first card
        // Wait for list to render
        await page.waitFor('pokemon-card');
        const pokemonCard = await page.$('pokemon-card');
        const cardView = await pokemonCard.$('.card');
        expect(cardView).not.toBeNull();
        await cardView.tap();

        // Verify page stack change or wait for new page
        await page.waitFor(2000);
        const currentPage = await miniProgram.currentPage();
        expect(currentPage.path).toContain('pages/detail/index');

        // Verify title or content
        // const title = await currentPage.$('.title');
        // expect(await title.text()).toBeDefined();
    });
});

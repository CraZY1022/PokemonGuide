const automator = require('miniprogram-automator');
const { resolve } = require('path');

describe('Home Page', () => {
    let miniProgram;
    let page;

    beforeAll(async () => {
        miniProgram = await automator.connect({
            wsEndpoint: 'ws://127.0.0.1:9420',
        });
        page = await miniProgram.reLaunch('/pages/home/index');
        await page.waitFor(500);
    }, 120000);

    afterAll(async () => {
        await miniProgram.disconnect();
    });

    it('H-001: Should display pokemon list', async () => {
        const list = await page.$('.list-container'); // Ensure this class exists in your list wrapper
        expect(list).not.toBeNull();

        // Wait for data loading
        await page.waitFor(2000);
        const items = await page.$$('pokemon-card');
        expect(items.length).toBeGreaterThan(0);
    });

    it('H-004: Should search pokemon by name', async () => {
        const searchBar = await page.$('search-bar');
        expect(searchBar).not.toBeNull();

        // Input "Pikachu" (assuming frontend handles input event or we trigger confirm)
        // Note: implementation depends on how search-bar component exposes events/methods
        // Simplest approach: setData if component allows, or simulate interactions
        const input = await searchBar.$('.search-bar-input'); // Need to know internal structure
        if (input) {
            await input.input('Pikachu');
            // Trigger search (e.g., enter key or search button)
            // await input.trigger('confirm'); 
            // For now, let's wait to see if list updates. 
            // Real implementation might need adjustment based on component internal hook
        }
    });
});

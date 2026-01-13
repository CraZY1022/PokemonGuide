const automator = require('miniprogram-automator');
const { resolve } = require('path');

describe('Detail Page V1.1 Features', () => {
    let miniProgram;
    let page;

    beforeAll(async () => {
        miniProgram = await automator.connect({
            wsEndpoint: 'ws://127.0.0.1:9420',
        });

        // Mock wx.vibrateShort before launching page
        await miniProgram.mockWxMethod(
            'vibrateShort',
            function (obj) {
                const app = getApp();
                app.globalData = app.globalData || {};
                app.globalData.vibrateShortCalled = true;
                app.globalData.vibrateShortParams = obj;
            }
        );

        // Go to home first then navigate to detail
        page = await miniProgram.reLaunch('/pages/home/index');
        await page.waitFor(2000); // Wait for list load

        const pokemonCard = await page.$('pokemon-card');
        const cardView = await pokemonCard.$('.card');
        await cardView.tap();
        await page.waitFor(2000); // Wait for detail page load
    }, 120000);

    afterAll(async () => {
        if (miniProgram) await miniProgram.disconnect();
    });

    it('D-Auto-001: Should display Shiny Toggle button', async () => {
        const currentPage = await miniProgram.currentPage();
        const toggleBtn = await currentPage.$('.toggle-btn');
        expect(toggleBtn).not.toBeNull();

        const icon = await currentPage.$('.shiny-icon');
        expect(await icon.text()).toContain('✨');
    });

    it('D-Auto-002: Should switch image capability', async () => {
        const currentPage = await miniProgram.currentPage();
        const toggleWrapper = await currentPage.$('.toggle-wrapper');

        // Initial state: Normal image visible
        // Note: We use class check because src might be dynamic/network
        // Based on wxml: class="visual-img {{isShiny ? 'hidden' : 'visible'}}"
        let normalImg = await currentPage.$('.image-stack image:nth-child(1)');
        // Get class attribute
        // automator element.attribute('class') returns the class string
        let normalClass = await normalImg.attribute('class');
        expect(normalClass).toContain('visible');

        // Tap toggle
        await toggleWrapper.tap();
        await page.waitFor(500); // Wait for transition

        // State 2: Shiny image visible
        let shinyImg = await currentPage.$('.image-stack image:nth-child(2)');
        let shinyClass = await shinyImg.attribute('class');
        expect(shinyClass).toContain('visible');

        // Toggle back
        await toggleWrapper.tap();
        await page.waitFor(500);
    });

    it('D-Auto-003: Should trigger Haptic Feedback', async () => {
        // We mocked wx.vibrateShort in beforeAll
        // Requirement: Trigger toggle to call vibrateShort

        // Reset globalData state if possible, or just check if it was called during the previous toggle
        // To be safe, let's toggle again
        const currentPage = await miniProgram.currentPage();
        const toggleWrapper = await currentPage.$('.toggle-wrapper');
        await toggleWrapper.tap();
        await page.waitFor(500);

        // Verify mock call by checking globalData
        const globalData = await miniProgram.evaluate(() => {
            const app = getApp();
            return {
                exists: !!app,
                globalData: app.globalData
            };
        });
        console.log('DEBUG_DATA:', JSON.stringify(globalData));

        const vibrateCalled = globalData && globalData.globalData && globalData.globalData.vibrateShortCalled;

        expect(vibrateCalled).toBe(true);
    });
});

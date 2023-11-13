const puppeteer = require('puppeteer');

describe('Travel Planner Modal', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('Homepage.html'); // Replace with the actual path to your HTML file
    });

    afterAll(async () => {
        await browser.close();
    });

    it('should open login modal on button click', async () => {
        await page.click('.btnLogin-popup');
        const wrapperClass = await page.$eval('.wrapper', (wrapper) => wrapper.className);
        expect(wrapperClass).toContain('active-popup');
    });

    it('should switch to register form on register link click', async () => {
        await page.click('.register-link');
        const formBoxClass = await page.$eval('.form-box.register', (formBox) => formBox.className);
        expect(formBoxClass).toContain('translateX(0)');
    });

    it('should switch to login form on login link click', async () => {
        await page.click('.login-link');
        const formBoxClass = await page.$eval('.form-box.login', (formBox) => formBox.className);
        expect(formBoxClass).toContain('translateX(0)');
    });

    it('should close the modal on close icon click', async () => {
        await page.click('.icon-close');
        const wrapperClass = await page.$eval('.wrapper', (wrapper) => wrapper.className);
        expect(wrapperClass).not.toContain('active-popup');
    });

    // Add more test cases as needed
});

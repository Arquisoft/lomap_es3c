import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/displayMaps.feature');
const apiEndPoint = process.env.REACT_APP_URI || 'http://localhost:3000'

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();

    await page
      .goto(apiEndPoint, {
        waitUntil: "networkidle0",
      })
      .catch(() => { });
  });

  test('The user is a owner of a Pod and he has friends', ({ given, when, then }) => {

    let user: string;
    let password: string;
    let provider: string;

    given('An user with a pod correctly identified, and with some friends', async () => {
      user = "pruebasLomapEs3c";
      password = "PrueLom3c+";
      provider = "https://solidcommunity.net/";
      const selectId = 'select-native';
      await page.select(`#${selectId}`, provider);
      await expect(page).toClick('button', { text: 'Acceder' });
      await page.waitForNavigation(); // esperar a que se cargue la siguiente página
      await page.type('#username', user);
      await page.type('#password', password);
      await expect(page).toClick('button', { text: 'Log In' });
      await page.waitForNavigation(); 
      await page.waitForTimeout(7000);
    });

    when('I try to display the friends list', async () => {
      await page.click('li#misMapas');
      await page.waitForTimeout(2000);
    });


    then('You can see the name of the friends', async () => {
      const pageContent = await page.content();
      const textExists = pageContent.includes('EjemploMapa');
      expect(textExists).toBe(true);
    });
  })

  afterAll(async () => {
    browser.close()
  })

});


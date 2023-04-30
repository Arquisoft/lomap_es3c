import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/newFriend.feature');
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

  test('The user wants to end a new friend solicitude', ({ given, when, then }) => {

    let user: string;
    let password: string;
    let provider: string;

    given('An user in LoMap', async () => {
      await page.setViewport({ width: 1366, height: 768 });
      await page.evaluate(() => {
        document.documentElement.requestFullscreen();
      });
      user = "pruebasLomapEs3c";
      password = "PrueLom3c+";
      provider = "https://solidcommunity.net/";
      const selectId = 'select-native';
      await page.select(`#${selectId}`, provider);
      await expect(page).toClick('button', { text: 'Acceder' });
      await page.waitForNavigation();
      await page.type('#username', user);
      await page.type('#password', password);
      await expect(page).toClick('button', { text: 'Log In' });
      await page.waitForNavigation();
      await page.waitForTimeout(7000);
    });

    when('I select the Opciones -> Nuevo amigo', async () => {
      await expect(page).toClick('button', { text: 'Opciones' });
      await page.waitForSelector('.MuiMenuItem-root');
      await page.click('.MuiMenuItem-root:nth-child(2)');
    });


    then('I can type the name of new friend', async () => {
      const inputElement = await page.$('#userName');
      if (inputElement !== null) {
        await inputElement.type('Amigo de ejemplo');
      } else {
        console.error('No se pudo encontrar el elemento de entrada.');
      }
    });
  })

  afterAll(async () => {
    browser.close()
  })

});


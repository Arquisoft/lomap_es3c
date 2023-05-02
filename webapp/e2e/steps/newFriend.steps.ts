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
      await page.waitForTimeout(12000);
    });

    when('I select the Opciones -> Nuevo amigo', async () => {
      await page.setViewport({ width: 1366, height: 768 });
      await page.waitForTimeout(1000);
      await expect(page).toClick('button', { text: 'Opciones' });
      await page.waitForTimeout(1000);
      await page.waitForSelector('#nuevoAmigo'); 
      await page.click('#nuevoAmigo');
    });


    then('I can type the name of new friend', async () => {
      await page.waitForTimeout(1000);
      const inputElement = await page.$('#userName');
      if (inputElement !== null) {
        await inputElement.type('Amigo');
      } else {
        console.error('No se pudo encontrar el elemento de entrada.');
      }
      const pageContent = await page.content();
      const textExists = pageContent.includes('Introduzca el nombre del usuario');
      expect(textExists).toBe(true);
    });
  })

  afterAll(async () => {
    browser.close()
  })

});


import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/lomapIdentification.feature');
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

  test('The user is a owner of a Pod', ({ given, when, then }) => {

    let user: string;
    let password: string;
    let provider: string;

    given('An user with a pod', () => {
      user = "pruebasLomapEs3c";
      password = "PrueLom3c+";
      provider = "https://solidcommunity.net/";
    });

    when('I select the Pod provider and LogIn in the provider', async () => {
      const selectId = 'select-native';
      await page.select(`#${selectId}`, provider);
      await expect(page).toClick('button', { text: 'Acceder' });
      await page.waitForNavigation(); // esperar a que se cargue la siguiente página
      await page.type('#username', user);
      await page.type('#password', password);
      await expect(page).toClick('button', { text: 'Log In' });
      await page.waitForNavigation(); 
    });


    then('You go to the home page in LoMap', async () => {
      await page.waitForTimeout(12000);
      const currentUrl = await page.url();
      expect(currentUrl).toContain('/home');
    });
  })

  afterAll(async () => {
    browser.close()
  })

});


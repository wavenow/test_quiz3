// puppeteer on WSL2cd

const puppeteer = require('puppeteer');

async function scrape() {
   const browser = await puppeteer.launch({});
   const page = await browser.newPage();
   var fund = process.argv.slice(2);
   let nav = "Fund does not exists.";
   //first page
   await page.goto('https://codequiz.azurewebsites.net/');
   const selector = 'p' // 
   var element = await page.waitForSelector("p");
   var text = await page.evaluate(element => element.textContent, element);

   //second page
   await page.click('input[type="button"]');
   var element = await page.waitForSelector("table");
   var text = await page.evaluate(element => element.textContent, element);
   var [element] = await page.$x(".//td[text()='" + fund + "']");

   //Found
   if (element) {
        nav = await page.evaluate(element => element.nextElementSibling.textContent, element);
   }

   console.log(nav);

   browser.close();
}
scrape();
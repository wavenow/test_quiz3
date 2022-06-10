// puppeteer on WSL2

const puppeteer = require('puppeteer');

async function scrape() {
   const browser = await puppeteer.launch({});
   const page = await browser.newPage();
   page.setDefaultTimeout(2000);
   var fund = process.argv.slice(2);
   let nav = "Fund does not exists. ";

   if (fund == "") {
      console.log("Please input the fund quote. Eg. B-FUTURESSF");
      process.exit();
   }else{
      fund = fund[0];
   }


   //first page
   try {
      await page.goto('https://codequiz.azurewebsites.net/');
   } catch (e) {
        console.log('Could not connect to codequiz - ' + e);
        process.exit();
   }

   try{
      var element = await page.waitForSelector("p");
      var text = await page.evaluate(element => element.textContent, element);
      await page.click('input[type="button"]');
   }catch (e) {
      console.log('The page might changed - ' + e);
      process.exit();
   }
   //
  

   //second page
   try{

      var element = await page.waitForSelector("table");
      var text = await page.evaluate(element => element.textContent, element);
      var [element] = await page.$x(".//td[text()='" + fund + "']");

      //Found
      if (element) {
         nav = await page.evaluate(element => element.nextElementSibling.textContent, element);
      }

      console.log(nav);

   }catch (e) {
      console.log('The page might changed - ' + e);
      process.exit();
   }
   //

   browser.close();
}
scrape();
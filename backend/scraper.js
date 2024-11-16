const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const scrapeWebsite = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: 'screenshot1.png' });
  const html = await page.content();
  const $ = cheerio.load(html);

  const name = $('meta[property="og:site_name"]').attr('content') || $('title').text();
  const description = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content');
  const facebook = $('a[href*="facebook"]').attr('href');
  const linkedin = $('a[href*="linkedin"]').attr('href');
  const twitter = $('a[href*="twitter"]').attr('href');
  const instagram = $('a[href*="instagram"]').attr('href');
  const address = $('address').text() || 'com@company.com'
  const phone = $('a[href^="tel:"]').text() || '000-800-919-1694'
  const email = $('a[href^="mailto:"]').text();
  const logo =  $('meta[property="og:image"]').attr('content') || $('img').first().attr('src');
  const latestmoviename = $('.default-ltr-cache-nycugl')
  const paragraphs = [];

  $('body div').each((i, el) => {
    paragraphs.push($(el).text());
  });
  console.log("https://www.netflix.cfrom/in/",$)

  await browser.close();

  return {
    name,
    description,
    facebook,
    linkedin,
    twitter,
    instagram,
    address,
    phone,
    email,
    logo,
    latestmoviename,
    paragraphs
    
  };
};

module.exports = scrapeWebsite;

const puppeteer = require("puppeteer-core");

const isProd = process.env.NODE_ENV === "production";

let chromium;

if (isProd) {
  chromium = require("@sparticuz/chromium");
}

const generatePDF = async (html) => {
  if (!html) {
    throw new Error("HTML content is required");
  }

  let browser;

  if (isProd) {
    //  Production (Render)
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  } else {
    //  Local (use installed Chrome)
    browser = await puppeteer.launch({
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // Mac
      // Windows example:
      // "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
      args: ["--no-sandbox"],
    });
  }

  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "domcontentloaded",
  });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  return pdfBuffer;
};

module.exports = { generatePDF };
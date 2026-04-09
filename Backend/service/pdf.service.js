const puppeteer = require("puppeteer");

const generatePDF = async (html) => {
  if (!html) {
    throw new Error("HTML content is required");
  }

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // for deployment
  });

  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "networkidle0",
  });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "20px",
      bottom: "20px",
      left: "10px",
      right: "10px",
    },
  });

  await browser.close();

  return pdfBuffer;
};

module.exports = { generatePDF };
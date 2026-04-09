const pdfService = require("../service/pdf.service");

const exportPDF = async (req, res) => {
  try {
    const { html } = req.body;

    const pdf = await pdfService.generatePDF(html);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
      "Content-Length": pdf.length,
    });

    return res.send(pdf);
  } catch (err) {
    if (err.message === "HTML content is required") {
      return res.status(400).json({ message: err.message });
    }

    res.status(500).json({ message: err.message });
  }
};

module.exports = { exportPDF };
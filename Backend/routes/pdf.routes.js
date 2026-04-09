 const express = require("express")
const { exportPDF } = require("../controller/pdf.controller");
const {authMiddleware} = require("../middleware/auth.middleware");
const router = express.Router();
// Protected route
router.post("/export", authMiddleware, exportPDF);

module.exports = router;
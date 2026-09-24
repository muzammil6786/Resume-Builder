const { Router } = require("express");
const {authMiddleware} = require("../middleware/auth.middleware.js");
const { analyze, jobMatch, tailor, analytics } = require("../controller/ai.controller.js");
const r = Router();
// r.use(auth);
r.post("/resume/analyze",authMiddleware, analyze);
// r.post("/job/match", jobMatch);
// r.post("/job/tailor", tailor);
r.get("/analytics",authMiddleware, analytics);

module.exports = r;
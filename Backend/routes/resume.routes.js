const express = require("express");
const ctrl = require("../controller/resume.controller");
const {authMiddleware} = require("../middleware/auth.middleware");

const router = express.Router();


router.post("/", authMiddleware, ctrl.create);
router.get("/", authMiddleware, ctrl.getAll);
router.get("/:id",authMiddleware, ctrl.getOne);
router.patch("/:id", authMiddleware, ctrl.update);
router.delete("/:id", authMiddleware, ctrl.remove);

module.exports = router;
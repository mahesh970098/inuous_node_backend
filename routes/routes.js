const express = require("express");
router = express.Router();

const adminRoutes = require("../controllers/adminCtrl");

router.post("/login", adminRoutes.login);
router.get("/patients", adminRoutes.patients);

module.exports = router;

const express = require("express");
router = express.Router();

const adminRoutes = require("../controllers/adminCtrl");

router.post("/login", adminRoutes.login);
router.get("/patients", adminRoutes.patients);

router.post("/insert_patientdata", adminRoutes.insert_patientdata);
router.post("/patients_data", adminRoutes.patients_data);

module.exports = router;

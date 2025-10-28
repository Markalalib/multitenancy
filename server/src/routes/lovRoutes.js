const express = require("express");
const router = express.Router();
const lovController = require("../controller/lovController");

router.post("/lov-names", lovController.insertOrUpdateLov);
router.post("/lov-details", lovController.insertOrUpdateLovDetails);
router.get("/dropdown", lovController.getDropdownData);

module.exports = router;

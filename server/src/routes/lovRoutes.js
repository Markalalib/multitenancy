const express = require("express");
const router = express.Router();
const lovController = require("../controller/lovController");

// POST: Insert or update main LOV Master
router.post("/lov-names", lovController.insertOrUpdateLov);

// POST: Insert or update LOV Details (supports array or single object)
router.post("/lov-details", lovController.insertOrUpdateLovDetails);

// GET: Fetch generic dropdown data via list name (calls your SP)
router.get("/dropdown", lovController.getDropdownData);

// GET: Fetch all Status options (for dropdowns/filtering)
router.get("/status", lovController.getStatusOptions);

module.exports = router;

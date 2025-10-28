const express = require("express");
const router = express.Router();
const tenantController = require("../controller/tenantController");

// POST: Insert or Update Tenant
router.post("/save", tenantController.insertUpdateTenant);

module.exports = router;

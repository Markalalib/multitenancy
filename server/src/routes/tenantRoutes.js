const express = require("express");
const router = express.Router();
const tenantController = require("../controller/tenantController");

// POST: Insert or Update Tenant
router.post("/save", tenantController.insertOrUpdateTenant);

// GET: Fetch all tenant names for dropdown/filter
router.get("/names", tenantController.getAllTenantNames);

// GET: Fetch tenant grid data (filter with query params: tenantName, status, etc.)
router.get("/grid", tenantController.getFilteredTenants);

// GET: Fetch all data for full tenant master grid (all columns as per your table)
router.get("/master-grid", tenantController.getAllTenantFullGrid);

module.exports = router;

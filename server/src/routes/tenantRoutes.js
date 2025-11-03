const express = require("express");
const router = express.Router();
const tenantController = require("../controller/tenantController");

// ✅ Create alias for frontend expectation
router.get("/list", tenantController.getAllTenantFullGrid);

// POST: Insert or Update Tenant
router.post("/save", tenantController.insertOrUpdateTenant);

// GET: Fetch all tenant names for dropdown/filter
router.get("/names", tenantController.getAllTenantNames);

// GET: Fetch tenant grid data (filter with query params: tenantName, status, etc.)
router.get("/grid", tenantController.getFilteredTenants);

// GET: Fetch all data for full tenant master grid (all columns as per your table)
router.get("/master-grid", tenantController.getAllTenantFullGrid);

// ================= MENU API Added Here ================= //
// GET: Fetch system menu (from SP, combine here)
router.get("/menu", tenantController.getSystemMenu);
// Example: GET http://localhost:5000/api/tenants/menu?userId=1
// ====================================================== //

module.exports = router;

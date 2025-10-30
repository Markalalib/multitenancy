const tenantService = require("../service/tenantService");

const tenantController = {
  // Insert or update tenant
  insertOrUpdateTenant: async (req, res) => {
    try {
      const tenantData = req.body;
      const result = await tenantService.insertOrUpdateTenant(tenantData);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      console.error("❌ insertOrUpdateTenant Controller Error:", err.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  },

  // Get all tenant names (dropdown/filter)
  getAllTenantNames: async (req, res) => {
    try {
      const names = await tenantService.getAllTenantNames();
      res.status(200).json(names);
    } catch (err) {
      console.error("❌ getAllTenantNames Controller Error:", err.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  },

  // Get tenants grid (with filters)
  getFilteredTenants: async (req, res) => {
    try {
      const tenants = await tenantService.getFilteredTenants({
        tenantName: req.query.tenantName,
        status: req.query.status,
        userId: req.query.userId,
        id: req.query.id
      });
      res.status(200).json(tenants);
    } catch (err) {
      console.error("❌ getFilteredTenants Controller Error:", err.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  },

  // Get full tenant master grid (all columns, for full table)
  getAllTenantFullGrid: async (req, res) => {
    try {
      const grid = await tenantService.getAllTenantFullGrid();
      res.status(200).json(grid);
    } catch (err) {
      console.error("❌ getAllTenantFullGrid Controller Error:", err.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  },

  // Get Menu from stored procedure for dropdown/sidebar
  getSystemMenu: async (req, res) => {
    const userId = req.query.userId || 1;
    try {
      const rows = await tenantService.getSystemMenu(userId);
      res.status(200).json(rows);
    } catch (err) {
      console.error("❌ getSystemMenu Controller Error:", err.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
};

module.exports = tenantController;

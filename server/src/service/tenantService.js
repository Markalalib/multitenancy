// ==========================================
// tenantService.js
// ==========================================
const tenantRepository = require("../repository/tenantRepository");

const tenantService = {
  // ======================================================
  // Insert or Update Tenant
  // ======================================================
  insertOrUpdateTenant: async (tenantData) => {
    try {
      const result = await tenantRepository.insertUpdateTenant(tenantData);

      if (result && result.success) {
        return {
          success: true,
          message: "Tenant saved successfully.",
          data: result.data || null,
        };
      }

      return {
        success: false,
        message: result?.message || "Failed to save tenant data.",
      };
    } catch (err) {
      console.error("❌ insertOrUpdateTenant Service Error:", err);
      return { success: false, message: "Error saving tenant data." };
    }
  },

  // ======================================================
  // Get All Tenant Names (for Dropdown)
  // ======================================================
  getAllTenantNames: async () => {
    try {
      const names = await tenantRepository.getAllTenantNames();
      return { success: true, data: names };
    } catch (err) {
      console.error("❌ getAllTenantNames Service Error:", err);
      return { success: false, message: "Error fetching tenant names." };
    }
  },

  // ======================================================
  // Get Filtered Tenants (via Stored Procedure)
  // ======================================================
  getFilteredTenants: async (filterParams) => {
    try {
      const tenants = await tenantRepository.getFilteredTenants(filterParams);
      return { success: true, data: tenants };
    } catch (err) {
      console.error("❌ getFilteredTenants Service Error:", err);
      return { success: false, message: "Error fetching filtered tenants." };
    }
  },

  // ======================================================
  // Get All Tenant Data for Master Grid
  // ======================================================
  getAllTenantFullGrid: async () => {
  try {
    const rows = await tenantRepository.getAllTenantFullGrid();
    return { success: true, data: rows };
  } catch (err) {
    console.error("❌ getAllTenantFullGrid Service Error:", err);
    return { success: false, message: "Error fetching tenant grid data." };
  }
},

  // ======================================================
  // Get a Single Tenant by ID
  // ======================================================
  getTenantById: async (id) => {
    try {
      const tenant = await tenantRepository.getTenantById(id);
      if (!tenant) {
        return { success: false, message: "Tenant not found." };
      }
      return { success: true, data: tenant };
    } catch (err) {
      console.error("❌ getTenantById Service Error:", err);
      return { success: false, message: "Error fetching tenant details." };
    }
  },

  // ======================================================
  // Delete Tenant by ID
  // ======================================================
  deleteTenant: async (id) => {
    try {
      const result = await tenantRepository.deleteTenant(id);
      if (result.affectedRows > 0) {
        return { success: true, message: "Tenant deleted successfully." };
      }
      return { success: false, message: "Tenant not found or already deleted." };
    } catch (err) {
      console.error("❌ deleteTenant Service Error:", err);
      return { success: false, message: "Error deleting tenant." };
    }
  },

  // ======================================================
  // Get System Menu (via Stored Procedure)
  // ======================================================
  getSystemMenu: async (userId) => {
    try {
      const rows = await tenantRepository.getSystemMenu(userId);
      return { success: true, data: rows };
    } catch (err) {
      console.error("❌ getSystemMenu Service Error:", err);
      return { success: false, message: "Error fetching system menu." };
    }
  },
};

module.exports = tenantService;

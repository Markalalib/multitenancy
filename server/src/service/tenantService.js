const tenantRepository = require('../repository/tenantRepository');

const tenantService = {
  // Insert or update tenant
  insertOrUpdateTenant: async (tenantData) => {
    try {
      const result = await tenantRepository.insertUpdateTenant(tenantData);
      return result;
    } catch (err) {
      console.error("❌ insertOrUpdateTenant Service Error:", err.message);
      return { success: false, message: err.message };
    }
  },

  // Get all tenant names (for dropdown)
  getAllTenantNames: async () => {
    try {
      const names = await tenantRepository.getAllTenantNames();
      return names;
    } catch (err) {
      console.error("❌ getAllTenantNames Service Error:", err.message);
      throw err;
    }
  },

  // Get filtered tenants via stored procedure
  getFilteredTenants: async (filterParams) => {
    try {
      const tenants = await tenantRepository.getFilteredTenants(filterParams);
      return tenants;
    } catch (err) {
      console.error("❌ getFilteredTenants Service Error:", err.message);
      throw err;
    }
  },

  // Get ALL columns for tenant master grid (for the big UI table)
  getAllTenantFullGrid: async () => {
    try {
      const rows = await tenantRepository.getAllTenantFullGrid();
      return rows;
    } catch (err) {
      console.error("❌ getAllTenantFullGrid Service Error:", err.message);
      throw err;
    }
  }
};

module.exports = tenantService;

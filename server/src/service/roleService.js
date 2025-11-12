// ==============================
// roleService.js
// ==============================

const roleRepository = require("../repository/roleRepository");

const roleService = {
  /**
   * Insert or update a role
   * @param {Object} roleData - The role details from the request body
   */
  insertOrUpdateRole: async (roleData) => {
    try {
      // Call repository function
      const result = await roleRepository.insertOrUpdateRole(roleData);

      // Return the repository result directly
      return result;
    } catch (error) {
      console.error("❌ roleService.insertOrUpdateRole Error:", error.message);
      return { success: false, message: "Service layer error: " + error.message };
    }
  },
};

module.exports = roleService;

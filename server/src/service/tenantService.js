const lovRepo = require("../repository/lovRepo");

const lovService = {
  // 🔹 Insert or Update LOV Master
  insertOrUpdateLov: async (lovData) => {
    try {
      // Basic validation
      if (!lovData.LOV_Name) {
        throw new Error("LOV_Name is required");
      }

      // Call repository
      const result = await lovRepo.insertOrUpdateLov(lovData);
      return result;
    } catch (err) {
      console.error("❌ insertOrUpdateLov Service Error:", err.message);
      return { success: false, message: err.message };
    }
  },

  // 🔹 Insert or Update LOV Details
  insertOrUpdateLovDetails: async (lovDetailsData) => {
    try {
      // Validation
      if (!lovDetailsData.LOV_Details_Name)
        throw new Error("LOV_Details_Name is required");
      if (!lovDetailsData.LOV_ID) throw new Error("LOV_ID is required");

      // Call repository
      const result = await lovRepo.insertOrUpdateLovDetails(lovDetailsData);
      return result;
    } catch (err) {
      console.error("❌ insertOrUpdateLovDetails Service Error:", err.message);
      return { success: false, message: err.message };
    }
  },
};

module.exports = lovService;

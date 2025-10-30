const lovRepository = require("../repository/lovRepository");

const lovService = {
  // Insert or update main LOV record
  insertOrUpdateLov: async (lovData) => {
    if (!lovData.LOV_Name) throw new Error("LOV_Name is required");
    return await lovRepository.insertOrUpdateLov(lovData);
  },

  // Insert or update LOV details record
  insertOrUpdateLovDetails: async (lovDetailsData) => {
    if (!lovDetailsData.LOV_Details_Name)
      throw new Error("LOV_Details_Name is required");
    if (!lovDetailsData.LOV_ID)
      throw new Error("LOV_ID is required");
    return await lovRepository.insertOrUpdateLovDetails(lovDetailsData);
  },

  // Get all status options (for dropdown)
  getStatusOptions: async () => {
    try {
      const rows = await lovRepository.getStatusOptions();
      return {
        success: true,
        message: "Status LOV data fetched successfully",
        data: rows
      };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  // Get dynamic dropdown options (custom SP-based list)
  getDropdownData: async (listName) => {
    if (!listName) throw new Error("List name is required");
    const result = await lovRepository.getDropdownData(listName);
    if (!result.success) {
      return { success: false, message: result.message };
    }
    return {
      success: true,
      message: "Dropdown data fetched successfully",
      data: result.data,
    };
  }
};

module.exports = lovService;

const lovRepo = require("../repository/lovRepo");

const lovService = {
  insertOrUpdateLov: async (lovData) => {
    // Basic validation
    if (!lovData.LOV_Name) throw new Error("LOV_Name is required");

    const result = await lovRepo.insertOrUpdateLov(lovData);
    return result;
  },
  insertOrUpdateLovDetails: async (lovDetailsData) => {
    // Validation
    if (!lovDetailsData.LOV_Details_Name)
      throw new Error("LOV_Details_Name is required");
    if (!lovDetailsData.LOV_ID) throw new Error("LOV_ID is required");

    const result = await lovRepo.insertOrUpdateLovDetails(lovDetailsData);
    return result;
  },
  getDropdownData: async (listName) => {
    // Basic validation
    if (!listName) throw new Error("List name is required");

    const result = await lovRepo.getDropdownData(listName);

    if (!result.success) {
      return { success: false, message: result.message };
    }

    return {
      success: true,
      message: "Dropdown data fetched successfully",
      data: result.data,
    };
  },
};

module.exports = lovService;

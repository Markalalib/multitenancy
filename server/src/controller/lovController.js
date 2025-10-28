const lovService = require("../service/lovService");

const lovController = {
  // Insert or Update LOV Master
  insertOrUpdateLov: async (req, res) => {
    try {
      const lovData = req.body;
      const result = await lovService.insertOrUpdateLov(lovData);
      console.log("💡 insertOrUpdateLov Controller Result:", result);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      console.error("❌ insertOrUpdateLov Controller Error:", err.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },

  // Insert or Update LOV Details
  insertOrUpdateLovDetails: async (req, res) => {
    try {
      const lovDetailsData = req.body;
      const result = await lovService.insertOrUpdateLovDetails(lovDetailsData);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      console.error(
        "❌ insertOrUpdateLovDetails Controller Error:",
        err.message
      );
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
  getDropdownData: async (req, res) => {
    try {
      const { listName } = req.query;
      const result = await lovService.getDropdownData(listName);

      console.log("💡 getDropdownData Controller Result:", result);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      console.error("❌ getDropdownData Controller Error:", err.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
};

module.exports = lovController;

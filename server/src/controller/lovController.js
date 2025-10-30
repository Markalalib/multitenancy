const lovService = require("../service/lovService");

const lovController = {
  // Insert or update LOV Master
  insertOrUpdateLov: async (req, res) => {
    try {
      const lovData = req.body;
      const result = await lovService.insertOrUpdateLov(lovData);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      console.error("❌ insertOrUpdateLov Controller Error:", err.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  },

  // Insert or update multiple LOV Details (or just one)
  insertOrUpdateLovDetails: async (req, res) => {
    try {
      // Accept both array and single object
      const detailsArray = Array.isArray(req.body) ? req.body : [req.body];
      const results = [];
      const errors = [];

      for (const [index, detail] of detailsArray.entries()) {
        try {
          if (!detail.LOV_ID || !detail.LOV_Details_Name) {
            errors.push({
              index,
              message: "LOV_ID and LOV_Details_Name are required",
              data: detail,
            });
            continue;
          }
          const result = await lovService.insertOrUpdateLovDetails(detail);
          if (result.success) {
            results.push({ ...detail, dbResult: result });
          } else {
            errors.push({
              index,
              message: result.message || "Insert/Update failed in service layer.",
              data: detail,
            });
          }
        } catch (err) {
          console.error(`❌ Error at record ${index}:`, err.message);
          errors.push({ index, message: err.message, data: detail });
        }
      }

      res.status(errors.length ? 207 : 201).json({
        success: errors.length === 0,
        message: errors.length === 0
          ? "All LOV Details inserted/updated successfully."
          : "Partial success — some LOV Details failed.",
        summary: {
          total: detailsArray.length,
          inserted: results.length,
          failed: errors.length,
        },
        addedLovDetails: results,
        failedLovDetails: errors,
      });
    } catch (err) {
      console.error("❌ insertOrUpdateLovDetails Controller Error:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error occurred during LOV Details insertion/updation.",
        error: err.message || "Failed to insert/update LOV details.",
      });
    }
  },

  // Get dropdown/status options (using direct repo call or service)
  getStatusOptions: async (req, res) => {
    try {
      const result = await lovService.getStatusOptions();
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      console.error("❌ getStatusOptions Controller Error:", err.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  },

  // Get dropdown list via a custom listName param and SP
  getDropdownData: async (req, res) => {
    try {
      const { listName } = req.query;
      const result = await lovService.getDropdownData(listName);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      console.error("❌ getDropdownData Controller Error:", err.message);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
};

module.exports = lovController;

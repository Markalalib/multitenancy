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
      // Ensure request body is always an array
      const lovDetailsArray = Array.isArray(req.body) ? req.body : [req.body];
      const results = [];
      const errors = [];

      // Iterate over all records
      for (const [index, lov] of lovDetailsArray.entries()) {
        const {
          LOV_Details_ID,
          LOV_ID,
          LOV_Details_Name,
          LOV_Details_Description,
          Effective_From,
          Effective_To,
          Is_Editable,
          IsData_Changed,
          Status,
          Notes,
          User,
        } = lov;

        // ✅ Basic validation
        if (!LOV_ID || !LOV_Details_Name) {
          errors.push({
            index,
            err: "LOV_ID and LOV_Details_Name are required.",
            data: lov,
          });
          continue;
        }

        try {
          // Call your service
          const result = await lovService.insertOrUpdateLovDetails(lov);

          if (!result.success) {
            errors.push({
              index,
              err: result.message || "Insert/Update failed at service layer.",
              data: lov,
            });
            continue;
          }

          // Success case
          results.push({ ...lov, dbresult: result });
        } catch (err) {
          console.error(` Error at record ${index}:`, err.message);
          errors.push({ index, err: err.message, data: lov });
        }
      }

      // ✅ Final summary response
      res.status(errors.length ? 207 : 201).json({
        success: errors.length === 0,
        message:
          errors.length === 0
            ? "All LOV Details inserted/updated successfully."
            : "Partial success — some LOV Details failed.",
        summary: {
          total: lovDetailsArray.length,
          inserted: results.length,
          failed: errors.length,
        },
        addedLovDetails: results,
        failedLovDetails: errors,
      });
    } catch (err) {
      console.error(" insertOrUpdateLovDetails Controller Error:", err);
      res.status(500).json({
        success: false,
        message: "Server error occurred during LOV Details insertion/updation.",
        error: err.message || "Failed to insert/update LOV details.",
      });
    }
  },

  getDropdownData: async (req, res) => {
    try {
      const { listName } = req.query;
      const result = await lovService.getDropdownData(listName);

      console.log(" getDropdownData Controller Result:", result);

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

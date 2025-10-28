const tenantService = require("../service/tenantService");

const tenantController = {
  insertUpdateTenant: async (req, res) => {
    try {
      const tenantData = req.body;
      const result = await tenantService.insertUpdateTenant(tenantData);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      console.error("❌ insertTenant Controller Error:", err.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
};

module.exports = tenantController;

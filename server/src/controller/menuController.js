const menuService = require("../service/menuService");

const menuController = {
  getMenu: async (req, res) => {
    try {
      const result = await menuService.getMenu();
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (err) {
      console.error("❌ getMenu Controller Error:", err.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
};
module.exports = menuController;

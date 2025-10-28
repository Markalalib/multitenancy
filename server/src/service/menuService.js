const menuRepo = require("../repository/menuRepo");

const menuService = {
  getMenu: async () => {
    try {
      const result = await menuRepo.getMenu();
      return result;
    } catch (err) {
      console.error("❌ getMenu Service Error:", err.message);
      return { success: false, message: err.message };
    }
  },
};
module.exports = menuService;

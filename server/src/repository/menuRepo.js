const db = require("../config/dbConfig");

const menuRepo = {
    getMenu: async () => {
        try {
            const query = "CALL SP_GetSystemMenu();";
            const [rows] = await db.query(query);
            return { success: true, data: rows[0] };
        } catch (err) {
            console.error("❌ getMenu Repo Error:", err.message);
            return { success: false, message: err.message };
        }
    },
};
module.exports = menuRepo;

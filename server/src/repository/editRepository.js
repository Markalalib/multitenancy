// modules/common/editBindMaster/editBindMasterRepo.js
const db = require("../config/dbConfig");

const editBindMasterRepo = {
  editBindMasterGrid: async (tableName, id) => {
    try {
      const query = "CALL LT_CNC_USR_SP_Edit_Bind_Master_Grid(?, ?)";
      const [rows] = await db.query(query, [tableName, id || null]);

      // MySQL stored procedures return an array of result sets; we take the first
      const editData = rows?.[0] || [];

      return {
        success: true,
        data: editData,
        message: "Edit bind master grid data fetched successfully",
      };
    } catch (err) {
      console.error(
        "❌ Repository Error (editBindMasterGrid):",
        err.message || err.sqlMessage
      );
      return {
        success: false,
        message: "Error fetching edit bind master grid data from repository.",
        error: err.message || err.sqlMessage,
      };
    }
  },
};

module.exports = editBindMasterRepo;
const db = require("../config/dbConfig");

const lovRepo = {
  // 🔹 Insert or Update LOV Master
  insertOrUpdateLov: async (lovData) => {
    try {
      const {
        LOV_ID,
        LOV_Name,
        LOV_Description,
        Module_ID,
        Tenant_ID,
        Is_Editable,
        Effective_From,
        Effective_To,
        IsData_Changed,
        Status,
        Notes,
        User,
      } = lovData;

      // 1️⃣ Execute stored procedure (IN params only)
      await db.query(
        `CALL LT_CNC_COM_SP_Insert_Update_Lov(
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @p_Result
        );`,
        [
          LOV_ID,
          LOV_Name,
          LOV_Description,
          Module_ID,
          Tenant_ID,
          Is_Editable,
          Effective_From,
          Effective_To,
          IsData_Changed,
          Status,
          Notes,
          User,
        ]
      );

      // 2️⃣ Retrieve OUT parameter result
      const [out] = await db.query(`SELECT @p_Result AS result;`);
      const result = out[0]?.result || "No response from procedure";

      return { success: true, message: result };
    } catch (error) {
      console.error("❌ insertOrUpdateLov Error:", error.message);
      return { success: false, message: error.message };
    }
  },

  // 🔹 Insert or Update LOV Details
  insertOrUpdateLovDetails: async (lovDetailsData) => {
    try {
      const {
        LOV_Details_ID,
        LOV_ID,
        LOV_Details_Name,
        LOV_Details_Description,
        Effective_From,
        Is_Editable,
        Effective_To,
        IsData_Changed,
        Status,
        Notes,
        User,
      } = lovDetailsData;

      // 1️⃣ Execute stored procedure (IN params only)
      await db.query(
        `CALL LT_CNC_COM_SP_Insert_Update_Lov_Details(
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @p_Result
        );`,
        [
          LOV_Details_ID,
          LOV_ID,
          LOV_Details_Name,
          LOV_Details_Description,
          Effective_From,
          Is_Editable,
          Effective_To,
          IsData_Changed,
          Status,
          Notes,
          User,
        ]
      );

      // 2️⃣ Retrieve OUT parameter result
      const [out] = await db.query(`SELECT @p_Result AS result;`);
      const result = out[0]?.result || "No response from procedure";

      return { success: true, message: result };
    } catch (error) {
      console.error("❌ insertOrUpdateLovDetails Error:", error.message);
      return { success: false, message: error.message };
    }
  },
  getDropdownData: async (listName) => {
    try {
      if (!listName) throw new Error("List name is required");

      // 1️ Execute stored procedure
      const [rows] = await db.query(`CALL SP_BIND_TENANT_DROPDOWN(?);`, [
        listName,
      ]);

      // 2️ Extract result set
      const data = rows[0] || [];

      return { success: true, data };
    } catch (error) {
      console.error("❌ getDropdownData Repo Error:", error.message);
      return { success: false, message: error.message };
    }
  },
};

module.exports = lovRepo;

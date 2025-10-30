const db = require('../config/dbConfig');

const lovRepository = {
  // 1. Insert or Update main LOV record using SP
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
      const [out] = await db.query(`SELECT @p_Result AS result;`);
      const result = out[0]?.result || "No response from procedure";
      return { success: true, message: result };
    } catch (error) {
      console.error("❌ insertOrUpdateLov Error:", error.message);
      return { success: false, message: error.message };
    }
  },

  // 2. Insert or Update LOV Details using SP
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
      const [out] = await db.query(`SELECT @p_Result AS result;`);
      const result = out[0]?.result || "No response from procedure";
      return { success: true, message: result };
    } catch (error) {
      console.error("❌ insertOrUpdateLovDetails Error:", error.message);
      return { success: false, message: error.message };
    }
  },

  // 3. Get status options for dropdown (LOV by name)
  getStatusOptions: async () => {
    try {
      const [rows] = await db.query(`
        SELECT LCD.LOV_Details_ID, LCD.LOV_Details_Name
          FROM COM_L_LOV_DETAILS LCD
          JOIN COM_M_LOV LM ON LCD.LOV_ID = LM.LOV_ID
         WHERE LM.LOV_Name = 'Status'
         ORDER BY LCD.LOV_Details_Name
      `);
      return rows;
    } catch (error) {
      console.error("❌ getStatusOptions Repo Error:", error.message);
      throw error;
    }
  },

  // 4. Dynamic: Get dropdown values for custom list (uses a SP)
  getDropdownData: async (listName) => {
    try {
      if (!listName) throw new Error("List name is required");
      const [rows] = await db.query(`CALL SP_BIND_TENANT_DROPDOWN(?);`, [listName]);
      const data = rows[0] || [];
      return { success: true, data };
    } catch (error) {
      console.error("❌ getDropdownData Repo Error:", error.message);
      return { success: false, message: error.message };
    }
  }
};

module.exports = lovRepository;

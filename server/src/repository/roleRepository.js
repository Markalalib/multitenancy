const db = require("../config/dbConfig");

const roleRepository = {
  insertOrUpdateRole: async (roleData) => {
    try {
      const [
        p_Role_ID,
        p_Role_Code,
        p_Role_Name,
        p_Role_Description,
        p_Role_Type_LOV_ID,
        p_Department_ID,
        p_Role_Level,
        p_Status,
        p_Tenant_ID,
        p_MaxUsers,
        p_Valid_From,
        p_Valid_To,
        p_Notes,
        p_User
      ] = [
        roleData.p_Role_ID,
        roleData.p_Role_Code,
        roleData.p_Role_Name,
        roleData.p_Role_Description,
        roleData.p_Role_Type_LOV_ID,
        roleData.p_Department_ID,
        roleData.p_Role_Level,
        roleData.p_Status,
        roleData.p_Tenant_ID,
        roleData.p_MaxUsers,
        roleData.p_Valid_From,
        roleData.p_Valid_To,
        roleData.p_Notes,
        roleData.p_User
      ];

      await db.query(
  `CALL LT_CNC_USR_SP_Insert_Update_Role(
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @p_LogicApps_Result
    )`,
  [
    p_Role_ID,
    p_Role_Code,
    p_Role_Name,
    p_Role_Description,
    p_Role_Type_LOV_ID,
    p_Department_ID,
    p_Role_Level,
    p_Status,
    p_Tenant_ID,
    p_MaxUsers,
    p_Valid_From,
    p_Valid_To,
    p_Notes,
    p_User      // This is the 14th IN, OUT is handled by MySQL
  ]
);


     
      const [out] = await db.query(`SELECT @p_LogicApps_Result AS result;`);
      const result = out[0]?.result || "No response";
      return { success: true, message: result };
    } catch (error) {
      console.error("❌ insertOrUpdateRole Error:", error.message);
      return { success: false, message: error.message };
    }
  }
};

module.exports = roleRepository;

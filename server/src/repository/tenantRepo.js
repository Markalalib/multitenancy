const db = require("../config/dbConfig");

const tenantRepo = {
  insertUpdateTenant: async (tenantData) => {
    try {
      const {
        p_Tenant_ID,
        p_Tenant_Name,
        p_Tenant_Short_Name,
        p_Tenant_Address1,
        p_Tenant_Phone1,
        p_Tenant_Phone2,
        p_Tenant_Phone3,
        p_Tenant_Fax,
        p_Tenant_Website,
        p_Tenant_Logo,
        p_Tenant_Founded_Date,
        p_Tenant_Contact_Email,
        p_Tenant_City,
        p_Tenant_Country,
        p_Tenant_State,
        p_Tenant_ZipCode,
        p_Max_Plant_Count,
        p_Tenant_Is_Approved,
        p_Cuser,
        p_Status,
        p_Notes,
      } = tenantData;

      //  Call SP with only IN parameters
      await db.query(
        `CALL sp_insert_update_tenant(
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @p_Result
        );`,
        [
          p_Tenant_ID,
          p_Tenant_Name,
          p_Tenant_Short_Name,
          p_Tenant_Address1,
          p_Tenant_Phone1,
          p_Tenant_Phone2,
          p_Tenant_Phone3,
          p_Tenant_Fax,
          p_Tenant_Website,
          p_Tenant_Logo,
          p_Tenant_Founded_Date,
          p_Tenant_Contact_Email,
          p_Tenant_City,
          p_Tenant_Country,
          p_Tenant_State,
          p_Tenant_ZipCode,
          p_Max_Plant_Count,
          p_Tenant_Is_Approved,
          p_Cuser,
          p_Status,
          p_Notes,
        ]
      );

      // Retrieve the OUT parameter
      const [out] = await db.query(`SELECT @p_Result AS result;`);
      const result = out[0]?.result || "No response";

      return { success: true, message: result };
    } catch (error) {
      console.error("❌ insertOrUpdateTenant Error:", error.message);
      return { success: false, message: error.message };
    }
  },
};

module.exports = tenantRepo;

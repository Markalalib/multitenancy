const db = require("../config/dbConfig");

const tenantRepository = {
  // 1. Insert or update tenant (via stored procedure)
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

      const [out] = await db.query(`SELECT @p_Result AS result;`);
      const result = out[0]?.result || "No response";
      return { success: true, message: result };
    } catch (error) {
      console.error("❌ insertOrUpdateTenant Error:", error.message);
      return { success: false, message: error.message };
    }
  },

  // 2. Get all tenant names for dropdown
  getAllTenantNames: async () => {
    const [rows] = await db.query(
      "SELECT Tenant_ID, Tenant_Name FROM TNT_M_TENANT ORDER BY Tenant_Name"
    );
    return rows;
  },

  // 3. Get tenants for the grid, with optional filter params
  getFilteredTenants: async ({ tenantName, status, userId = 1, id = 1 }) => {
    let tenantId = null;
    if (tenantName) {
      const [row] = await db.query(
        "SELECT Tenant_ID FROM TNT_M_TENANT WHERE Tenant_Name = ?", [tenantName]
      );
      tenantId = row[0]?.Tenant_ID || null;
    }
    const [rows] = await db.query(
      "CALL LT_CNC_USR_SP_Bind_Master_Grid(?,?,?,?,?,?,?,?,?)",
      [
        "TNT_M_TENANT",
        userId,
        id,
        null,
        null,
        tenantId,
        status,
        null,
        null
      ]
    );
    return rows[0];
  },

  // 4. Get all data for full master tenant grid (for UI table)
  getAllTenantFullGrid: async () => {
    const [rows] = await db.query(`
      SELECT
        T.Tenant_ID,
        T.Tenant_Code,
        T.Tenant_Name,
        T.Tenant_Address1 AS Tenant_Address,
        T.Tenant_Phone1 AS Tenant_Phone,
        CONCAT(U.FirstName, ' ', U.LastName) AS Created_By,
        DATE_FORMAT(T.Cdate, '%d-%b-%Y') AS Created_Date,
        LD.LOV_Details_Name as Status
      FROM TNT_M_TENANT T
        LEFT JOIN USR_M_USER U ON T.Cuser = U.UserID
        LEFT JOIN COM_L_LOV_DETAILS LD ON LD.LOV_Details_ID = T.Status
      ORDER BY T.Cdate DESC;
    `);
    return rows;
  }
};

module.exports = tenantRepository;

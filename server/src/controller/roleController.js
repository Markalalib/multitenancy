const db = require('../config/dbConfig');

// ✅ Insert / Update Role
exports.insertOrUpdateRole = async (req, res) => {
  let conn;
  try {
    const {
      Role_ID = 0,
      Role_Code = null,
      Role_Name,
      Role_Description = null,
      Role_Type_LOV_ID = null,
      Department_ID = null,
      Role_Level = 0,
      Status = 0,
      Tenant_ID = 0,
      MaxUsers = null,
      Valid_From = null,
      Valid_To = null,
      Notes = null,
      User = 0
    } = req.body;

    if (!Role_Name)
      return res.status(400).json({ success: false, message: 'Role_Name is required' });

    conn = await db.getConnection();

    // Step 1: initialize OUT variable
    await conn.query('SET @LogicApps_Result = "";');

    // Step 2: call SP
    await conn.query(
      'CALL LT_CNC_USR_SP_Insert_Update_Role(?,?,?,?,?,?,?,?,?,?,?,?,?,?, @LogicApps_Result)',
      [
        Role_ID,
        Role_Code,
        Role_Name,
        Role_Description,
        Role_Type_LOV_ID,
        Department_ID,
        Role_Level,
        Status,
        Tenant_ID,
        MaxUsers,
        Valid_From,
        Valid_To,
        Notes,
        User
      ]
    );

    // Step 3: get OUT value
    const [outRows] = await conn.query('SELECT @LogicApps_Result AS Message;');

    const message = outRows?.[0]?.Message || 'No message returned';
    res.json({ success: true, message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (conn) conn.release();
  }
};

// ✅ Fetch Role Grid
exports.getRoleGrid = async (req, res) => {
  try {
    const { User_ID, Tenant_ID, Role_ID = 0 } = req.query;
    const [rows] = await db.query('CALL LT_CNC_USR_SP_Bind_Role_Grid(?,?,?)', [
      User_ID,
      Tenant_ID,
      Role_ID
    ]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

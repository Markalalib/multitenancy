// server/src/repository/userRepository.js
const db = require('../config/dbConfig');

exports.createOrUpdateUser = async (userData) => {
  const conn = await db.getConnection();
  try {
    await conn.query('SET @LogicApps_Result = "";');

    // Build params array in correct order
    const params = [
      userData.UserID || 0,
      userData.FirstName,
      userData.LastName,
      userData.Email,
      userData.Username,
      userData.PasswordHash,
      userData.PhoneNumber,
      userData.Tenant_ID,
      userData.RoleID,
      userData.Default_Role_ID,
      userData.UserType || 0,
      userData.Status || 1,
      userData.Notes || '',
      userData.SendWelcomeEmail || 0,
      userData.RequirePasswordChange || 0,
      userData.MFAEnabled || 0,
      userData.ProfilePicturePath || '',
      userData.User || 1 // Created/Updated by User
    ];

    const callSql = `
      CALL LT_CNC_USR_SP_Insert_Update_User(
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @LogicApps_Result
      );
    `;

    await conn.query(callSql, params);

    const [outRows] = await conn.query('SELECT @LogicApps_Result AS Message;');
    return outRows?.[0]?.Message ?? null;
  } catch (err) {
    console.error('Error executing SP:', err);
    throw err;
  } finally {
    conn.release();
  }
};

exports.getAllUsers = async (tenantId = null) => {
  const sql = tenantId
    ? `SELECT UserID, FirstName, LastName, Email, Username, PhoneNumber, Tenant_ID, Status, Cdate 
       FROM USR_M_User 
       WHERE Tenant_ID = ? 
       ORDER BY UserID DESC`
    : `SELECT UserID, FirstName, LastName, Email, Username, PhoneNumber, Tenant_ID, Status, Cdate 
       FROM USR_M_User 
       ORDER BY UserID DESC`;

  return tenantId
    ? (await db.query(sql, [tenantId]))[0]
    : (await db.query(sql))[0];
};

exports.getUserById = async (userId) => {
  const sql = `SELECT * FROM USR_M_User WHERE UserID = ? LIMIT 1`;
  const [rows] = await db.query(sql, [userId]);
  return rows[0] ?? null;
};

exports.softDeleteUser = async (userId, performedByUserId = 0) => {
  const sql = `UPDATE USR_M_User 
               SET Status = 0, Udate = NOW(), Uuser = ? 
               WHERE UserID = ?`;
  const [result] = await db.query(sql, [performedByUserId, userId]);
  return result.affectedRows;
};

exports.hardDeleteUser = async (userId) => {
  const sql = `DELETE FROM USR_M_User WHERE UserID = ?`;
  const [result] = await db.query(sql, [userId]);
  return result.affectedRows;
};

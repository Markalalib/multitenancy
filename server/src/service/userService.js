// server/src/service/userService.js
const userRepo = require('../repository/userRepository');

exports.createOrUpdateUser = async (payload) => {
  // Build params in strict order required by the SP:
  // p_UserID, p_FirstName, p_LastName, p_Email, p_Username, p_PasswordHash, p_PhoneNumber,
  // p_Tenant_ID, p_RoleID, p_Default_Role_ID, p_UserType, p_Status, p_Notes,
  // p_SendWelcomeEmail, p_RequirePasswordChange, p_MFAEnabled, p_ProfilePicturePath, p_SkillList, p_User
  const params = [
    payload.UserID ?? 0,
    payload.FirstName ?? null,
    payload.LastName ?? null,
    payload.Email ?? null,
    payload.Username ?? null,
    payload.PasswordHash ?? null,
    payload.PhoneNumber ?? null,
    payload.Tenant_ID ?? 0,
    payload.RoleID ?? '', // comma separated roles e.g. "1,2,3"
    payload.Default_Role_ID ?? 0,
    payload.UserType ?? 0,
    payload.Status ?? 1,
    payload.Notes ?? null,
    payload.SendWelcomeEmail ? 1 : 0,
    payload.RequirePasswordChange ? 1 : 0,
    payload.MFAEnabled ? 1 : 0,
    payload.ProfilePicturePath ?? null,
    payload.SkillList ?? '', // "1:10,2:5" or empty
    payload.User ?? 0
  ];

  const resultMessage = await userRepo.createOrUpdateUser(params);
  return resultMessage;
};

exports.getAllUsers = async (tenantId) => {
  const rows = await userRepo.getAllUsers(tenantId);
  return rows;
};

exports.getUserById = async (userId) => {
  return userRepo.getUserById(userId);
};

exports.softDeleteUser = async (userId, performedBy) => {
  return userRepo.softDeleteUser(userId, performedBy);
};
exports.hardDeleteUser = async (userId) => {
  return userRepo.hardDeleteUser(userId);
};
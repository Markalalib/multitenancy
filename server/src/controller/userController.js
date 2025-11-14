// server/src/controller/userController.js
const userService = require('../service/userService');

exports.createOrUpdateUser = async (req, res) => {
  try {
    // Accept either exact body keys or adapt from front-end naming
    const body = {
      UserID: req.body.UserID ?? req.body.UserID ?? 0,
      FirstName: req.body.FirstName ?? req.body.firstName ?? null,
      LastName: req.body.LastName ?? req.body.lastName ?? null,
      Email: req.body.Email ?? req.body.email ?? null,
      Username: req.body.Username ?? req.body.username ?? null,
      PasswordHash: req.body.PasswordHash ?? req.body.password ?? null,
      PhoneNumber: req.body.PhoneNumber ?? req.body.phoneNumber ?? null,
      Tenant_ID: req.body.Tenant_ID ?? req.body.tenantId ?? 0,
      RoleID: req.body.RoleID ?? req.body.roleIds ?? req.body.RoleIDs ?? req.body.roles ?? '', // should be comma separated string of role IDs
      Default_Role_ID: req.body.Default_Role_ID ?? req.body.defaultRoleId ?? 0,
      UserType: req.body.UserType ?? req.body.userType ?? 0,
      Status: req.body.Status ?? req.body.status ?? 1,
      Notes: req.body.Notes ?? req.body.notes ?? null,
      SendWelcomeEmail: req.body.SendWelcomeEmail ?? req.body.sendWelcomeEmail ?? 0,
      RequirePasswordChange: req.body.RequirePasswordChange ?? req.body.requirePasswordChange ?? 0,
      MFAEnabled: req.body.MFAEnabled ?? req.body.mfaEnabled ?? 0,
      ProfilePicturePath: req.body.ProfilePicturePath ?? req.body.profilePicturePath ?? null,
      SkillList: req.body.SkillList ?? req.body.skillList ?? '',
      User: req.body.User ?? req.body.loggedInUserId ?? 0
    };

    // Validate required fields (example)
    if (!body.FirstName || !body.Email || !body.Username) {
      return res.status(400).json({ success: false, message: 'FirstName, Email and Username are required' });
    }

    const result = await userService.createOrUpdateUser(body);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error('User createOrUpdate error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const tenantId = req.query.Tenant_ID || req.query.tenantId || null;
    const rows = await userService.getAllUsers(tenantId);
    res.json(rows);
  } catch (err) {
    console.error('getAllUsers error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('getUserById error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const performedBy = req.body.performedBy || 0;
    const affected = await userService.softDeleteUser(id, performedBy);
    if (affected > 0) return res.json({ success: true, message: 'User deactivated' });
    return res.status(404).json({ success: false, message: 'User not found or already deactivated' });
  } catch (err) {
    console.error('deleteUser error:', err);
    res.status(500).json({ error: err.message });
  }
};
exports.hardDeleteUser = async (req, res) => {
  try {
    const id = req.params.id; 
    const affected = await userService.hardDeleteUser(id);
    if (affected > 0) return res.json({ success: true, message: 'User permanently deleted' });
    return res.status(404).json({ success: false, message: 'User not found' });
  } catch (err) {
    console.error('hardDeleteUser error:', err);
    res.status(500).json({ error: err.message });
  }
};
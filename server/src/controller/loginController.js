const loginService = require("../service/loginservice");

const loginController = {
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Call service layer
      const result = await loginService.loginUser(username, password);

      // result = { status: 'success', message: 'Login successful' }
      res.status(200).json(result);
    } catch (error) {
      console.error("Controller Error:", error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  },
};

module.exports = loginController;

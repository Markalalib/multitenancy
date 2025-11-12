const loginRepository = require("../repository/loginRepository");

const loginService = {
  loginUser: async (username, password) => {
    try {
      const result = await loginRepository.loginUser(username, password);
      return result; // simply pass the repository result
    } catch (error) {
      console.error("Service Error:", error);
      throw error;
    }
  },
};

module.exports = loginService;

const db = require("../config/dbConfig");

const loginRepository = {
  loginUser: async (username, password) => {
    try {
      console.log("📥 Repository received:", username, password);

      // ✅ Make sure the SQL string is a single valid string
      const sql = "CALL LT_CNC_USR_SP_User_Login(?, ?, @rst);";
      const sqlOut = "SELECT @rst AS result;";

      // ✅ Call the stored procedure first
      await db.query(sql, [username, password]);

      // ✅ Then fetch the OUT parameter
      const [rows] = await db.query(sqlOut);

      const message = rows?.[0]?.result || "No response from stored procedure";

      console.log("📤 Repository returning:", message);

      return {
        status:
          message.toLowerCase().includes("success") ||
          message.toLowerCase().includes("logged")
            ? "success"
            : "fail",
        message,
      };
    } catch (error) {
      console.error("❌ Repository Error:", error);
      throw error;
    }
  },
};

module.exports = loginRepository;

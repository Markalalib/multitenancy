// ==============================
// server.js
// ==============================


const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const db = require("./src/config/dbConfig");

const app = express();

// ====== MIDDLEWARE ======
app.use(express.json());


// Enable CORS for frontend
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174"],  
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ====== ROUTES ======
try {
  const tenantRoutes = require("./src/routes/tenantRoutes");
  const menuRoutes = require("./src/routes/menuRoutes");
  const lovRoutes = require("./src/routes/lovRoutes");
  const loginRoutes= require("./src/routes/loginRoutes");
  const editBindMasterRoutes =require("./src/routes/editRoutes");
  const roleRoutes = require('./src/routes/roleRoutes');
  const userRoutes = require('./src/routes/userRoutes');

  app.use("/api/tenants", tenantRoutes);
  app.use("/api/menus", menuRoutes);
  app.use("/api/lov", lovRoutes);
  app.use("/api/login",loginRoutes);
  app.use("/api",editBindMasterRoutes);
  app.use('/api/roles', roleRoutes);
  app.use('/api/users', userRoutes);

  console.log("✅ User routes loaded successfully!");
} catch (err) {
  console.error("❌ Failed to load routes:", err.message);
}

// ====== ROOT CHECK ======
app.get("/", (req, res) => {
  res.send("✅ Multitenancy API is running...");
});

// ====== SERVER STARTUP ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

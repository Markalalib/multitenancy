const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./src/config/dbConfig");
// ====== MIDDLEWARE ======

// Enable CORS for your frontend dev server
app.use(
  cors({
    origin: ["http://localhost:5173"],  
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Parse JSON bodies
app.use(express.json());

// ====== ROUTES (PLURALIZED, REST-STYLE) ======
const tenantRoutes = require("./src/routes/tenantRoutes");
const menuRoutes = require("./src/routes/menuRoutes");
const lovRoutes = require("./src/routes/lovRoutes");

app.use("/api/tenants", tenantRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/lov", lovRoutes);

// ====== SERVER STARTUP ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./src/config/dbConfig");

app.use(
  cors({
    origin: ["http://localhost:5173"], // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// Tenant routes
const tenantRoutes = require("./src/routes/tenantRoutes");
app.use("/api/tenant", tenantRoutes);
// Menu routes
const menuRoutes = require("./src/routes/menuRoutes");
app.use("/api/menu", menuRoutes);
// LOV routes
const lovRoutes = require("./src/routes/lovRoutes");
app.use("/api/lov", lovRoutes);

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running http://localhost:${PORT}`);
});

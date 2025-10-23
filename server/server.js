const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(express.json());

// -- NOW INCLUDES PORT FROM .env --
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10)   // <<<<<< Added here
});

console.log('ENV:', process.env.DB_HOST, process.env.DB_USER, process.env.DB_NAME, process.env.DB_PORT);

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.message);
    process.exit(1);
  }
  console.log('Connected to MySQL DB');
});

/* ========== API: Get All Tenants ========== */
function getAllTenants(req, res) {
  db.query('SELECT * FROM tnt_m_tenant', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
}
app.get('/api/tenant', getAllTenants);

/* ========== API: Get Single Tenant ========== */
function getTenantById(req, res) {
  db.query('SELECT * FROM tnt_m_tenant WHERE Tenant_ID = ?', [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows[0] || {});
  });
}
app.get('/api/tenant/:id', getTenantById);

/* ========== API: Create Tenant ========== */
function createTenant(req, res) {
  const d = req.body;
  const logo = req.file ? req.file.buffer.toString('base64') : null;
  db.query(
    `INSERT INTO tnt_m_tenant
      (Tenant_Code, Tenant_Name, Tenant_Short_Name, Tenant_Address1, Tenant_Phone1, Tenant_Phone2, Tenant_Phone3, Tenant_Fax, Tenant_Website, Tenant_Logo, Tenant_Founded_Date, Tenant_Contact_Email, Tenant_City, Tenant_Country, Tenant_State, Tenant_ZipCode, Max_Plant_Count, Tenant_Is_Approved, Notes, Status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      d.Tenant_Code, d.Tenant_Name, d.Tenant_Short_Name, d.Tenant_Address1,
      d.Tenant_Phone1, d.Tenant_Phone2, d.Tenant_Phone3, d.Tenant_Fax, d.Tenant_Website,
      logo, d.Tenant_Founded_Date, d.Tenant_Contact_Email, d.Tenant_City,
      d.Tenant_Country, d.Tenant_State, d.Tenant_ZipCode, d.Max_Plant_Count,
      d.Tenant_Is_Approved ? 1 : 0, d.Notes, d.Status
    ],
    (err, r) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: r.insertId });
    }
  );
}
app.post('/api/tenant', upload.single('Tenant_Logo'), createTenant);

/* ========== API: Update Tenant ========== */
function updateTenant(req, res) {
  const d = req.body;
  const logo = req.file ? req.file.buffer.toString('base64') : null;
  db.query(
    `UPDATE tnt_m_tenant SET Tenant_Code=?, Tenant_Name=?, Tenant_Short_Name=?, Tenant_Address1=?, Tenant_Phone1=?, Tenant_Phone2=?, Tenant_Phone3=?, Tenant_Fax=?, Tenant_Website=?, Tenant_Logo=?, Tenant_Founded_Date=?, Tenant_Contact_Email=?, Tenant_City=?, Tenant_Country=?, Tenant_State=?, Tenant_ZipCode=?, Max_Plant_Count=?, Tenant_Is_Approved=?, Notes=?, Status=?
    WHERE Tenant_ID=?`,
    [
      d.Tenant_Code, d.Tenant_Name, d.Tenant_Short_Name, d.Tenant_Address1,
      d.Tenant_Phone1, d.Tenant_Phone2, d.Tenant_Phone3, d.Tenant_Fax, d.Tenant_Website,
      logo, d.Tenant_Founded_Date, d.Tenant_Contact_Email, d.Tenant_City,
      d.Tenant_Country, d.Tenant_State, d.Tenant_ZipCode, d.Max_Plant_Count,
      d.Tenant_Is_Approved ? 1 : 0, d.Notes, d.Status,
      req.params.id
    ],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
}
app.put('/api/tenant/:id', upload.single('Tenant_Logo'), updateTenant);

/* ========== API: Delete Tenant ========== */
function deleteTenant(req, res) {
  db.query('DELETE FROM tnt_m_tenant WHERE Tenant_ID=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
}
app.delete('/api/tenant/:id', deleteTenant);

app.listen(5000, () => console.log('Server running on port 5000'));

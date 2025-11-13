import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RoleForm.css";


const RoleForm = ({ editingId,onSuccess }) => {
  const [formData, setFormData] = useState({
    Role_ID: 0,
    Role_Code: "",
    Role_Name: "",
    Role_Description: "",
    Tenant_ID: "",
    Role_Type: "",
    Role_Level: "",
    MaxUsers: "",
    Status: 1,
    Valid_From: "",
    Valid_To: "",
    Notes: "",
    User: 1,
  });

  const [tenantList, setTenantList] = useState([]);
  const [roleTypeList, setRoleTypeList] = useState([]);
  const [roleLevelList, setRoleLevelList] = useState([]);

  // 🔹 Fetch LOV data + tenant list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tenantRes, typeRes, levelRes] = await Promise.all([
          axios.get("http://localhost:5000/api/lov/dropdown?listName=TENANT_LIST"),
          axios.get("http://localhost:5000/api/lov/dropdown?listName=ROLE_TYPE_LIST"),
          axios.get("http://localhost:5000/api/lov/dropdown?listName=ROLE_LEVEL_LIST"),
        ]);

        if (tenantRes.data.success) setTenantList(tenantRes.data.data);
        if (typeRes.data.success) setRoleTypeList(typeRes.data.data);
        if (levelRes.data.success) setRoleLevelList(levelRes.data.data);
      } catch (err) {
        console.error("Error loading LOVs:", err);
      }
    };
    fetchData();
  }, []);
console.log("TENANT",tenantList);
console.log("ROLE TYPE",roleTypeList)
console.log("ROLE LEVEL",roleLevelList)

 const [loading, setLoading] = useState(false);
 // 🔹 Fetch Role details when editing
     useEffect(() => {
    if (!editingId) return;

    const fetchRoleForEdit = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/edit/usr_m_role/${editingId}`);

        const record = res.data.data?.[0]; // ✅ Safe extraction
        if (record) {
          setFormData({
            Role_ID: record.Role_ID,
            Role_Code: record.Role_Code || "",
            Role_Name: record.Role_Name || "",
            Role_Description: record.Role_Description || "",
            Tenant_ID: record.Tenant_ID || "",
            Role_Type: record.Role_Type || "",
            Role_Level: record.Role_Level || "",
            MaxUsers: record.MaxUsers || "",
            Status: record.Status ?? 1,
            Valid_From: record.Valid_From
              ? record.Valid_From.split("T")[0]
              : "",
            Valid_To: record.Valid_To
              ? record.Valid_To.split("T")[0]
              : "",
            Notes: record.Notes || "",
            User: 1,
          });
        } else {
          alert("⚠️ No role details found for the selected ID");
        }
      } catch (err) {
        console.error("❌ Error fetching role details:", err);
        alert("Failed to load role details. Check console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoleForEdit();
  }, [editingId]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      Role_ID: Number(formData.Role_ID) || 0,
      Status: Number(formData.Status),
      Tenant_ID: Number(formData.Tenant_ID),
      MaxUsers: formData.MaxUsers ? Number(formData.MaxUsers) : null,
      User: Number(formData.User),
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/roles/insertUpdateRole",
        payload
      );
      alert(res.data.message || "✅ Role saved successfully!");
      if (onSuccess) onSuccess();
      setFormData({
        Role_ID: 0,
        Role_Code: "",
        Role_Name: "",
        Role_Description: "",
        Tenant_ID: "",
        Role_Type: "",
        Role_Level: "",
        MaxUsers: "",
        Status: 1,
        Valid_From: "",
        Valid_To: "",
        Notes: "",
        User: 1,
      });
    } catch (err) {
      console.error("Error saving role:", err);
      alert("❌ Error saving role. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="role-form card p-4 shadow-sm">
      <h5 className="mb-4 text-primary fw-bold">Create / Edit Role</h5>

      <div className="row g-3">
        {/* Role Code */}
        <div className="col-md-6">
          <label className="form-label">Role code(Auto)</label>
          <input
            type="text"
            name="Role_Code"
            value={formData.Role_Code}
            readOnly
            className="form-control bg-light"
          />
        </div>

        {/* Role Name */}
        <div className="col-md-6">
          <label className="form-label">Role Name *</label>
          <input
            type="text"
            name="Role_Name"
            value={formData.Role_Name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Role Description */}
        <div className="col-md-12">
          <label className="form-label">Role Description</label>
          <input
            type="text"
            name="Role_Description"
            value={formData.Role_Description}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Tenant */}
        <div className="col-md-6">
          <label className="form-label">Tenant</label>
          <select
            name="Tenant_ID"
            value={formData.Tenant_ID}
            onChange={handleChange}
            className="form-select"
            required
          >
            
            {tenantList.map((t) => (
              <option key={t.Id} value={t.Id}>
                {t.Name}
              </option>
            ))}
          </select>
        </div>

        {/* Role Type */}
        <div className="col-md-6">
          <label className="form-label">Role Type *</label>
          <select
            name="Role_Type"
            value={formData.Role_Type}
            onChange={handleChange}
            className="form-select"
            required
          >
            
            {roleTypeList.map((type) => (
              <option key={type.Id} value={type.Name}>
                {type.Name}
              </option>
            ))}
          </select>
        </div>

        {/* Role Level */}
        <div className="col-md-6">
          <label className="form-label">Role Level *</label>
          <select
            name="Role_Level"
            value={formData.Role_Level}
            onChange={handleChange}
            className="form-select"
            required
          >
            
          {roleLevelList.map((lvl) => (
            <option key={lvl.Id} value={lvl.Id}>
             {lvl.Name}
            </option>
         ))}

          </select>
        </div>

        {/* Valid From */}
        <div className="col-md-3">
          <label className="form-label">Valid From</label>
          <input
            type="date"
            name="Valid_From"
            value={formData.Valid_From}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Valid To */}
        <div className="col-md-3">
          <label className="form-label">Valid To</label>
          <input
            type="date"
            name="Valid_To"
            value={formData.Valid_To}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Max Users */}
        <div className="col-md-6">
          <label className="form-label">Max Users</label>
          <input
            type="number"
            name="MaxUsers"
            value={formData.MaxUsers}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Status */}
        <div className="col-md-6">
          <label className="form-label">Status</label>
          <select
            name="Status"
            value={formData.Status}
            onChange={handleChange}
            className="form-select"
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>

        {/* Notes */}
        <div className="col-md-12">
          <label className="form-label">Notes</label>
          <textarea
            name="Notes"
            value={formData.Notes}
            onChange={handleChange}
            rows={3}
            className="form-control"
          />
        </div>
      </div>

      <div className="mt-4 text-end">
        <button type="submit" className="btn btn-primary me-2">
          💾 Save
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() =>
            setFormData({
              Role_ID: 0,
              Role_Code: "",
              Role_Name: "",
              Role_Description: "",
              Tenant_ID: "",
              Role_Type: "",
              Role_Level: "",
              MaxUsers: "",
              Status: 1,
              Valid_From: "",
              Valid_To: "",
              Notes: "",
              User: 1,
            })
          }
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default RoleForm;
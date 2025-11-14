import React, { useState,useEffect } from "react";
import axios from "axios";
import "../../Styles/global.css"; // custom styling

export default function TenantForm({ onSuccess, onClose, editingId }) {
  const [formData, setFormData] = useState({
    p_Tenant_ID: editingId || null,
    p_Tenant_Name: "",
    p_Tenant_Short_Name: "",
    p_Tenant_Address1: "",
    p_Tenant_Phone1: "",
    p_Tenant_Phone2: "",
    p_Tenant_Phone3: "",
    p_Tenant_Fax: "",
    p_Tenant_Website: "",
    p_Tenant_Logo: null,
    p_Tenant_Founded_Date: "",
    p_Tenant_Contact_Email: "",
    p_Tenant_City: "",
    p_Tenant_Country: "",
    p_Tenant_State: "",
    p_Tenant_ZipCode: "",
    p_Max_Plant_Count: "",
    p_Tenant_Is_Approved: 0,
    p_Cuser: 1,
    p_Status: 1,
    p_Notes: "",
  });
  const [loading, setLoading] = useState(false);
    useEffect(() => {
    if (editingId) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/edit/TNT_M_TENANT/${editingId}`)
        .then((res) => {
          const record = res.data.data?.[0];
          if (record) {
            setFormData({
              p_Tenant_ID: record.Tenant_ID,
              p_Tenant_Name: record.Tenant_Name || "",
              p_Tenant_Short_Name: record.Tenant_Short_Name || "",
              p_Tenant_Address1: record.Tenant_Address1 || "",
              p_Tenant_Phone1: record.Tenant_Phone1 || "",
              p_Tenant_Phone2: record.Tenant_Phone2 || "",
              p_Tenant_Phone3: record.Tenant_Phone3 || "",
              p_Tenant_Fax: record.Tenant_Fax || "",
              p_Tenant_Website: record.Tenant_Website || "",
              p_Tenant_Logo: record.Tenant_Logo || null,
              p_Tenant_Founded_Date: record.Tenant_Founded_Date
                ? record.Tenant_Founded_Date.split("-").reverse().join("-")
                : "",
              p_Tenant_Contact_Email: record.Tenant_Contact_Email || "",
              p_Tenant_City: record.Tenant_City || "",
              p_Tenant_Country: record.Tenant_Country || "",
              p_Tenant_State: record.Tenant_State || "",
              p_Tenant_ZipCode: record.Tenant_ZipCode || "",
              p_Max_Plant_Count: record.Max_Plant_Count || "",
              p_Tenant_Is_Approved: record.Tenant_Is_Approved || 0,
              p_Status: record.Status || 1,
              p_Notes: record.Notes || "",
              p_Cuser: 1,
            });
          }
        })
        .catch(() => alert("❌ Failed to load tenant details"))
        .finally(() => setLoading(false));
    }
  }, [editingId]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
            ? 1
            : 0
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/tenants/save", formData);
      alert(res.data.message || "Tenant saved successfully!");
      onSuccess && onSuccess();
    } catch (error) {
      console.error(error);
      alert("Error saving tenant data");
    }
  };

  const handleClear = () => {
    setFormData({
      p_Tenant_ID: "",
      p_Tenant_Name: "",
      p_Tenant_Short_Name: "",
      p_Tenant_Address1: "",
      p_Tenant_Phone1: "",
      p_Tenant_Phone2: "",
      p_Tenant_Phone3: "",
      p_Tenant_Fax: "",
      p_Tenant_Website: "",
      p_Tenant_Logo: null,
      p_Tenant_Founded_Date: "",
      p_Tenant_Contact_Email: "",
      p_Tenant_City: "",
      p_Tenant_Country: "",
      p_Tenant_State: "",
      p_Tenant_ZipCode: "",
      p_Max_Plant_Count: "",
      p_Tenant_Is_Approved: 0,
      p_Cuser: 1,
      p_Status: 1,
      p_Notes: "",
    });
  };

  return (
    <div className="page-container">
      <div className="tenant-form-card">
        <div className="tenant-form-header d-flex justify-between align-center mb-3">
          <h4>{editingId ? "Edit Tenant" : "Create Tenant"}</h4>
          <button type = "button" className="btn btn-secondary   " onClick={onClose}
           style={{ borderRadius: "50%", padding: "0.3rem 0.7rem" }}>
            ×
            </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Tenant Name */}
            <div className="form-col-md-6">
              <label className="form-label">Tenant Name *</label>
              <input
                type="text"
                className="form-control"
                name="p_Tenant_Name"
                value={formData.p_Tenant_Name}
                onChange={handleChange}
                placeholder="Enter Tenant Name"
              />
            </div>

            <div className="col-md-6">
              <label>Short Name</label>
              <input
                type="text"
                className="form-control"
                name="p_Tenant_Short_Name"
                value={formData.p_Tenant_Short_Name}
                onChange={handleChange}
                placeholder="Enter Short Name"
              />
            </div>

            <div className="col-12 ">
              <label>Address *</label>
              <input
                type="text"
                  className="form-control"
                name="p_Tenant_Address1"
                value={formData.p_Tenant_Address1}
                onChange={handleChange}
                placeholder="Street / Area / Landmark"
              />
            </div>

            <div className="col-md-4">
              <label>City</label>
              <input
                type="text"
                 className="form-control"
                name="p_Tenant_City"
                value={formData.p_Tenant_City}
                onChange={handleChange}
                placeholder="Enter City"
              />
            </div>

            <div className="col-md-4">
              <label>Country *</label>
              <input
                type="text"
                 className="form-control"
                name="p_Tenant_Country"
                value={formData.p_Tenant_Country}
                onChange={handleChange}
                placeholder="Enter Country"
              />
            </div>

            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                 className="form-control"
                name="p_Tenant_State"
                value={formData.p_Tenant_State}
                onChange={handleChange}
                placeholder="Enter State"
              />
            </div>

            <div className="col-md-4">
              <label>Zip Code</label>
              <input
                type="text"
                 className="form-control"
                name="p_Tenant_ZipCode"
                value={formData.p_Tenant_ZipCode}
                onChange={handleChange}
                placeholder="Enter Zip Code"
              />
            </div>

            <div className="col-md-4">
              <label>Primary Phone *</label>
              <input
                type="text"
                 className="form-control"
                name="p_Tenant_Phone1"
                value={formData.p_Tenant_Phone1}
                onChange={handleChange}
                placeholder="Enter Phone"
              />
            </div>

            <div className="col-md-4">
              <label>Office Phone</label>
              <input
                type="text"
                 className="form-control"
                name="p_Tenant_Phone2"
                value={formData.p_Tenant_Phone2}
                onChange={handleChange}
                placeholder="Enter Office Phone"
              />
            </div>

            <div className="col-md-4">
              <label>Alternate Phone</label>
              <input
                type="text"
                 className="form-control"
                name="p_Tenant_Phone3"
                value={formData.p_Tenant_Phone3}
                onChange={handleChange}
                placeholder="Enter Alternate Phone"
              />
            </div>

            <div className="fcol-md-6">
              <label>Email *</label>
              <input
                type="email"
                 className="form-control"
                name="p_Tenant_Contact_Email"
                value={formData.p_Tenant_Contact_Email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>

            <div className="col-md-6">
              <label>Website</label>
              <input
                type="text"
                 className="form-control"
                name="p_Tenant_Website"
                value={formData.p_Tenant_Website}
                onChange={handleChange}
                placeholder="Enter Website"
              />
            </div>

            <div className="col-md-6">
              <label>Logo</label>
              <input type="file"  className="form-control" name="p_Tenant_Logo" onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <label>Founded Date</label>
              <input
                type="date"
                 className="form-control"
                name="p_Tenant_Founded_Date"
                value={formData.p_Tenant_Founded_Date}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label>Max Plant Count</label>
              <input
                type="number"
                 className="form-control"
                name="p_Max_Plant_Count"
                value={formData.p_Max_Plant_Count}
                onChange={handleChange}
                placeholder="Enter Max Plant Count"
              />
            </div>

            <div className="col-md-6 d-flex align-items-center mt-4">
              <label>
                <input
                  type="checkbox"
                  name="p_Tenant_Is_Approved"
                  checked={formData.p_Tenant_Is_Approved === 1}
                  onChange={handleChange}
                    className="form-check-input me-2"
                />
                Approved
              </label>
            </div>

            <div className="col-12">
              <label>Notes</label>
              <textarea
                name="p_Notes"
                  className="form-control"
                value={formData.p_Notes}
                onChange={handleChange}
                rows="3"
                placeholder="Enter Notes"
              />
            </div>
          </div>

          <div className="d-flex gap-3 justify-content-end mt-4">
            <button type="submit" className="btn btn-primary">Save Tenant</button>
            <button type="button" onClick={handleClear} className="btn-clear">
              Clear
            </button>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

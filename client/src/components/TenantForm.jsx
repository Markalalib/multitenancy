// ==============================
// src/components/TenantForm.jsx
// ==============================
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import 'react-phone-input-2/lib/bootstrap.css';
import PhoneInput from 'react-phone-input-2';



export default function TenantForm({ editingId = null, onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    p_Tenant_ID: 0,
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
  p_Notes: ""
});

  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  // 🟢 Fetch tenant details when editing
  useEffect(() => {
    if (!editingId) return;

    const fetchTenant = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/tenant/${editingId}`);
        const tenant = res.data;

        if (tenant) {
          setFormData((prev) => ({
            ...prev,
            p_Tenant_ID: tenant.Tenant_ID,
            p_Tenant_Name: tenant.Tenant_Name || "",
            p_Tenant_Short_Name: tenant.Tenant_Short_Name || "",
            p_Tenant_Address1: tenant.Tenant_Address1 || "",
            p_Tenant_Phone1: tenant.Tenant_Phone1 || "",
            p_Tenant_Phone2: tenant.Tenant_Phone2 || "",
            p_Tenant_Phone3: tenant.Tenant_Phone3 || "",
            p_Tenant_Fax: tenant.Tenant_Fax || "",
            p_Tenant_Website: tenant.Tenant_Website || "",
            p_Tenant_Founded_Date: tenant.Tenant_Founded_Date
              ? tenant.Tenant_Founded_Date.split("T")[0]
              : "",
            p_Tenant_Contact_Email: tenant.Tenant_Contact_Email || "",
            p_Tenant_City: tenant.Tenant_City || "",
            p_Tenant_Country: tenant.Tenant_Country || "",
            p_Tenant_State: tenant.Tenant_State || "",
            p_Tenant_ZipCode: tenant.Tenant_ZipCode || "",
            p_Max_Plant_Count: tenant.Max_Plant_Count || "",
            p_Tenant_Is_Approved: tenant.Tenant_Is_Approved ? 1 : 0,
            p_Notes: tenant.Notes || "",
          }));
        }
      } catch (err) {
        console.error("❌ Error fetching tenant details:", err);
        alert("Failed to load tenant details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [editingId, API_BASE]);

  // 🟣 Handle input changes
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

  const handleTenantName = (e) => {
    setFormData((prev) => ({
      ...prev,
      p_Tenant_Name: e.target.value
    }))
  }


  // 🟢 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
  p_Tenant_ID: formData.p_Tenant_ID || 0,
  p_Tenant_Name: formData.p_Tenant_Name,
  p_Tenant_Short_Name: formData.p_Tenant_Short_Name,
  p_Tenant_Address1: formData.p_Tenant_Address1,
  p_Tenant_City: formData.p_Tenant_City,
  p_Tenant_Country: formData.p_Tenant_Country,
  p_Tenant_State: formData.p_Tenant_State,
  p_Tenant_ZipCode: formData.p_Tenant_ZipCode,
  p_Tenant_Phone1: formData.p_Tenant_Phone1,
  p_Tenant_Phone2: formData.p_Tenant_Phone2,
  p_Tenant_Phone3: formData.p_Tenant_Phone3,
  p_Tenant_Fax: formData.p_Tenant_Fax,
  p_Tenant_Website: formData.p_Tenant_Website,
  p_Tenant_Founded_Date: formData.p_Tenant_Founded_Date,
  p_Tenant_Contact_Email: formData.p_Tenant_Contact_Email,
  p_Tenant_Is_Approved: formData.p_Tenant_Is_Approved,
  p_Max_Plant_Count: formData.p_Max_Plant_Count,
  p_Notes: formData.p_Notes,
  p_Cuser: 1,
  p_Status: 1
};
console.log("📤 Sending payload:", payload);


const res = await axios.post(`${API_BASE}/api/tenants/save`, payload, {
  headers: { "Content-Type": "application/json" },
});


      if (res.data?.success) {
        alert(editingId ? "✅ Tenant updated successfully!" : "✅ Tenant created successfully!");
        if (onSuccess) onSuccess();
      } else {
        alert("⚠️ Operation failed: " + (res.data?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("❌ Error saving tenant:", error);
      alert("Error saving tenant data. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // 🟡 Clear form
  const handleClear = () => {
    setFormData({
      p_Tenant_ID: null,
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
console.log(formData);
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading tenant details...</p>
      </div>
    );
  }

  // ================================
  // Render Form
  // ================================
  return (
    <div className="container mt-4">
      <div className="card shadow border-primary">
        <div className="card-header bg-primary text-white text-center">
          <h4>{editingId ? "Edit Tenant" : "Create Tenant"}</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Tenant Name */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Tenant Name *</label>
                <input
                  type="text"
                  name="p_Tenant_Name"
                  value={formData.p_Tenant_Name}
                  onChange={(e)=>handleTenantName(e)}
                  className="form-control"
                  required
                />
              </div>

              {/* Short Name */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Short Name</label>
                <input
                  type="text"
                  name="p_Tenant_Short_Name"
                  value={formData.p_Tenant_Short_Name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Address */}
              <div className="col-12">
                <label className="form-label fw-semibold">Address *</label>
                <input
                  type="text"
                  name="p_Tenant_Address1"
                  value={formData.p_Tenant_Address1}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Country */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Country</label>
                <div className="d-flex align-items-center gap-2">
                  <ReactCountryFlag
                    countryCode={formData.p_Tenant_Country}
                    svg
                    style={{
                      width: "2em",
                      height: "2em",
                    }}
                    title={formData.p_Tenant_Country}
                  />
                  <input
                    type="text"
                    name="p_Tenant_Country"
                    value={formData.p_Tenant_Country}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter country"
                    required
                  />
                </div>
              </div>

              {/* City */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">City</label>
                <input
                  type="text"
                  name="p_Tenant_City"
                  value={formData.p_Tenant_City}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* State */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">State</label>
                <input
                  type="text"
                  name="p_Tenant_State"
                  value={formData.p_Tenant_State}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Zip Code */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Zip Code</label>
                <input
                  type="text"
                  name="p_Tenant_ZipCode"
                  value={formData.p_Tenant_ZipCode}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              {/* Primary Phone */}
<div className="col-md-4">
  <label className="form-label fw-semibold">Primary Phone *</label>
  <PhoneInput
    country={'in'} // default India
    value={formData.p_Tenant_Phone1}
    onChange={(value) =>
      setFormData({ ...formData, p_Tenant_Phone1: value })
    }
    inputClass="form-control"
    containerStyle={{ width: '100%' }}
    inputStyle={{ width: '100%' }}
    enableSearch={true}
  />
</div>

{/* Alternate Phone */}
<div className="col-md-4">
  <label className="form-label fw-semibold">Alternate Phone</label>
  <PhoneInput
    country={'in'}
    value={formData.p_Tenant_Phone2}
    onChange={(value) =>
      setFormData({ ...formData, p_Tenant_Phone2: value })
    }
    inputClass="form-control"
    containerStyle={{ width: '100%' }}
    inputStyle={{ width: '100%' }}
    enableSearch={true}
  />
</div>

{/* Other Phone */}
<div className="col-md-4">
  <label className="form-label fw-semibold">Other Phone</label>
  <PhoneInput
    country={'in'}
    value={formData.p_Tenant_Phone3}
    onChange={(value) =>
      setFormData({ ...formData, p_Tenant_Phone3: value })
    }
    inputClass="form-control"
    containerStyle={{ width: '100%' }}
    inputStyle={{ width: '100%' }}
    enableSearch={true}
  />
</div>

              
              {/* Fax */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Fax</label>
                <input
                  type="text"
                  name="p_Tenant_Fax"
                  value={formData.p_Tenant_Fax}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Website */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Website</label>
                <input
                  type="text"
                  name="p_Tenant_Website"
                  value={formData.p_Tenant_Website}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Email *</label>
                <input
                  type="email"
                  name="p_Tenant_Contact_Email"
                  value={formData.p_Tenant_Contact_Email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Founded Date */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Founded Date</label>
                <input
                  type="date"
                  name="p_Tenant_Founded_Date"
                  value={formData.p_Tenant_Founded_Date}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Max Plant Count */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Max Plant Count</label>
                <input
                  type="number"
                  name="p_Max_Plant_Count"
                  value={formData.p_Max_Plant_Count}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Logo Upload */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Logo Upload</label>
                <input
                  type="file"
                  name="p_Tenant_Logo"
                  onChange={handleChange}
                  className="form-control"
                  accept="image/*"
                />
              </div>

              {/* Approval Checkbox */}
              <div className="col-md-6 d-flex align-items-center mt-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="p_Tenant_Is_Approved"
                    checked={formData.p_Tenant_Is_Approved === 1}
                    onChange={handleChange}
                    className="form-check-input"
                    id="isApproved"
                  />
                  <label htmlFor="isApproved" className="form-check-label fw-semibold">
                    Is Approved?
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div className="col-12">
                <label className="form-label fw-semibold">Notes</label>
                <textarea
                  name="p_Notes"
                  value={formData.p_Notes}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                <button type="submit" className="btn btn-success" disabled={loading}>
                  {loading ? "Saving..." : editingId ? "Update Tenant" : "Save Tenant"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleClear}>
                  Clear
                </button>
                {onClose && (
                  <button type="button" className="btn btn-outline-danger" onClick={onClose}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

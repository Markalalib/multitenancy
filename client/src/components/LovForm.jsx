import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LovForm() {
  const [formData, setFormData] = useState({
    LOV_ID: 0,
    LOV_Name: "",
    LOV_Description: "",
    Module_ID: 0,
    Tenant_ID: 0,
    Is_Editable: 1,
    Effective_From: "",
    Effective_To: "",
    IsData_Changed: 0,
    Status: 1,
    Notes: "",
    User: 1001,
  });

  const [moduleList, setModuleList] = useState([]);
  const [tenantList, setTenantList] = useState([]);

  // 🔹 Fetch dropdown data from backend
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [moduleRes, tenantRes] = await Promise.all([
          axios.get(
            "http://localhost:5000/api/lov/dropdown?listName=MODULE_LIST"
          ),
          axios.get(
            "http://localhost:5000/api/lov/dropdown?listName=TENANT_LIST"
          ),
        ]);

        if (moduleRes.data.success) setModuleList(moduleRes.data.data);
        if (tenantRes.data.success) setTenantList(tenantRes.data.data);
      } catch (error) {
        console.error("❌ Error fetching dropdown data:", error);
      }
    };
    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/lov/lov-names",
        formData
      );
      alert(res.data.message || "LOV saved successfully!");
      console.log("Response:", res.data);
    } catch (error) {
      console.error(error);
      alert("Error saving LOV data");
    }
  };

  const handleClear = () => {
    setFormData({
      LOV_ID: 0,
      LOV_Name: "",
      LOV_Description: "",
      Module_ID: 0,
      Tenant_ID: 0,
      Is_Editable: 1,
      Effective_From: "",
      Effective_To: "",
      IsData_Changed: 0,
      Status: 1,
      Notes: "",
      User: 1001,
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-primary">
        <div className="card-header bg-primary text-white text-center">
          <h4>LOV Configuration</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* LOV Name */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">LOV Name *</label>
                <input
                  type="text"
                  name="LOV_Name"
                  value={formData.LOV_Name}
                  onChange={handleChange}
                  placeholder="Enter LOV Name"
                  className="form-control"
                  required
                />
              </div>

              {/* Description */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Description</label>
                <input
                  type="text"
                  name="LOV_Description"
                  value={formData.LOV_Description}
                  onChange={handleChange}
                  placeholder="Enter Description"
                  className="form-control"
                />
              </div>

              {/* 🔽 Module Dropdown */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Module *</label>
                <select
                  name="Module_ID"
                  value={formData.Module_ID}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  {moduleList.map((m) => (
                    <option key={m.Id} value={m.Id}>
                      {m.Name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 🔽 Tenant Dropdown */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Tenant *</label>
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

              {/* Editable */}
              <div className="col-md-6 d-flex align-items-center">
                <div className="form-check mt-3">
                  <input
                    type="checkbox"
                    name="Is_Editable"
                    checked={formData.Is_Editable === 1}
                    onChange={handleChange}
                    className="form-check-input"
                    id="isEditable"
                  />
                  <label
                    htmlFor="isEditable"
                    className="form-check-label fw-semibold"
                  >
                    Is Editable?
                  </label>
                </div>
              </div>

              {/* Effective Dates */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Effective From *
                </label>
                <input
                  type="date"
                  name="Effective_From"
                  value={formData.Effective_From}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Effective To *</label>
                <input
                  type="date"
                  name="Effective_To"
                  value={formData.Effective_To}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Flags */}
              <div className="col-md-6 d-flex align-items-center">
                <div className="form-check mt-3">
                  <input
                    type="checkbox"
                    name="IsData_Changed"
                    checked={formData.IsData_Changed === 1}
                    onChange={handleChange}
                    className="form-check-input"
                    id="isDataChanged"
                  />
                  <label
                    htmlFor="isDataChanged"
                    className="form-check-label fw-semibold"
                  >
                    Data Changed?
                  </label>
                </div>
              </div>

              <div className="col-md-6 d-flex align-items-center">
                <div className="form-check mt-3">
                  <input
                    type="checkbox"
                    name="Status"
                    checked={formData.Status === 1}
                    onChange={handleChange}
                    className="form-check-input"
                    id="status"
                  />
                  <label
                    htmlFor="status"
                    className="form-check-label fw-semibold"
                  >
                    Active?
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div className="col-12">
                <label className="form-label fw-semibold">Notes</label>
                <textarea
                  name="Notes"
                  value={formData.Notes}
                  onChange={handleChange}
                  placeholder="Enter Notes"
                  className="form-control"
                  rows="4"
                ></textarea>
              </div>

              {/* User */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">User ID</label>
                <input
                  type="number"
                  name="User"
                  value={formData.User}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Buttons */}
              <div className="col-12 d-flex justify-content-end mt-3 gap-2">
                <button type="submit" className="btn btn-primary">
                  Save LOV
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="btn btn-secondary"
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

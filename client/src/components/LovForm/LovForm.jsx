import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LovForm.css"; // make sure this is imported

export default function LovForm() {
  const [formData, setFormData] = useState({
    LOV_ID: 0,
    LOV_Name: "",
    LOV_Description: "",
    Module_ID: 0,
    Tenant_ID: 0,
    Status: 1,
    Notes: "",
  });

  const [moduleList, setModuleList] = useState([]);
  const [tenantList, setTenantList] = useState([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [moduleRes, tenantRes] = await Promise.all([
          axios.get("http://localhost:5000/api/lov/dropdown?listName=MODULE_LIST"),
          axios.get("http://localhost:5000/api/lov/dropdown?listName=TENANT_LIST"),
        ]);
        if (moduleRes.data.success) setModuleList(moduleRes.data.data);
        if (tenantRes.data.success) setTenantList(tenantRes.data.data);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };
    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, Is_Editable: 0 };
    try {
      const res = await axios.post("http://localhost:5000/api/lov/lov-names", payload);
      alert(res.data.message || "LOV saved successfully!");
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
      Status: 1,
      Notes: "",
    });
  };

  return (
    <div className="lov-page">
      <div className="lov-header">
        <h4 className="lov-title">List of Values Management</h4>
      </div>

      <div className="container">
        <div className="card shadow border-0">
          <div className="card-header">
            <h5 className="mb-0">Create / Edit Values Details</h5>
          </div>

          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label fw-semibold">List Of Value Name *</label>
                  <input
                    type="text"
                    name="LOV_Name"
                    value={formData.LOV_Name}
                    onChange={handleChange}
                    placeholder="Enter Value Name"
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">List Of Value Description</label>
                  <textarea
                    name="LOV_Description"
                    value={formData.LOV_Description}
                    onChange={handleChange}
                    placeholder="Enter Description"
                    className="form-control"
                    rows="2"
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Tenant *</label>
                  <select
                    name="Tenant_ID"
                    value={formData.Tenant_ID}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value={0}>-- Select Tenant --</option>
                    {tenantList.map((t) => (
                      <option key={t.Id} value={t.Id}>
                        {t.Name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Module *</label>
                  <select
                    name="Module_ID"
                    value={formData.Module_ID}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value={0}>-- Select Module --</option>
                    {moduleList.map((m) => (
                      <option key={m.Id} value={m.Id}>
                        {m.Name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Status *</label>
                  <select
                    name="Status"
                    value={formData.Status}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Notes</label>
                  <textarea
                    name="Notes"
                    value={formData.Notes}
                    onChange={handleChange}
                    placeholder="Enter notes..."
                    className="form-control"
                    rows="2"
                  ></textarea>
                </div>

                <div className="col-12 d-flex justify-content-end mt-3 gap-2">
                  <button type="submit" className="btn btn-primary px-4">
                    Save
                  </button>
                  <button type="button" onClick={handleClear} className="btn btn-light border px-4">
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

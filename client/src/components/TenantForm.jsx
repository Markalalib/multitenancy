import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  Tenant_Prefix_ID: '',
  Tenant_Code: '',
  Tenant_Name: '',
  Tenant_Short_Name: '',
  Tenant_Address1: '',
  Tenant_Country: '',
  Tenant_State: '',
  Tenant_City: '',
  Tenant_ZipCode: '',
  Tenant_Phone1: '',
  Tenant_Phone2: '',
  Tenant_Phone3: '',
  Tenant_Fax: '',
  Tenant_Website: '',
  Tenant_Founded_Date: '',
  Tenant_Contact_Email: '',
  Max_Plant_Count: '',
  Tenant_Logo: null,
  Tenant_Is_Approved: false,
  Notes: '',
  Status: '',
};

export default function TenantForm({ editingId, onSuccess, onClose }) {
  const [form, setForm] = useState(initialState);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    if (editingId) {
      axios.get(`/api/tenant/${editingId}`).then(res => {
        setForm({ ...initialState, ...res.data });
        if (res.data.Tenant_Logo) setLogoPreview(`data:image/jpeg;base64,${res.data.Tenant_Logo}`);
      });
    } else {
      setForm(initialState);
      setLogoPreview(null);
    }
  }, [editingId]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") setForm({ ...form, [name]: checked });
    else if (type === "file") {
      setForm({ ...form, [name]: files[0] });
      setLogoPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v !== null && v !== undefined) data.append(k, v);
      });
      if (editingId) {
        await axios.put(`/api/tenant/${editingId}`, data);
        alert("Tenant updated!");
      } else {
        await axios.post('/api/tenant', data);
        alert("Tenant added!");
      }
      setForm(initialState);
      setLogoPreview(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      alert('Operation failed: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data"
      style={{
        background: "#fff",
        borderRadius: "10px",
        padding: "2rem",
        maxWidth: "98vw",
        margin: "2rem auto",
        boxShadow: "0 2px 12px #0002"
      }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.2rem 2rem"
      }}>
        {/* Left section */}
        <div>
          <div className="mb-3">
            <label className="form-label">Tenant Code *</label>
            <input name="Tenant_Code" type="text" className="form-control" required value={form.Tenant_Code} onChange={handleChange} placeholder="Auto-Generation" />
          </div>
          <div className="mb-3">
            <label className="form-label">Short Name</label>
            <input name="Tenant_Short_Name" type="text" className="form-control" value={form.Tenant_Short_Name} onChange={handleChange} placeholder="Enter Short Name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Country *</label>
            <input name="Tenant_Country" type="text" className="form-control" required value={form.Tenant_Country} onChange={handleChange} placeholder="Enter Country" />
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input name="Tenant_City" type="text" className="form-control" value={form.Tenant_City} onChange={handleChange} placeholder="Enter City"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Primary Phone *</label>
            <input name="Tenant_Phone1" type="text" className="form-control" required value={form.Tenant_Phone1} onChange={handleChange} placeholder="Enter Phone" />
          </div>
          <div className="mb-3">
            <label className="form-label">Office Phone</label>
            <input name="Tenant_Phone2" type="text" className="form-control" value={form.Tenant_Phone2} onChange={handleChange} placeholder="Enter Office Phone" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email *</label>
            <input name="Tenant_Contact_Email" type="email" className="form-control" required value={form.Tenant_Contact_Email} onChange={handleChange} placeholder="Enter Email" />
          </div>
          <div className="mb-3">
            <label className="form-label">ZipCode *</label>
            <input name="Tenant_ZipCode" type="text" className="form-control" value={form.Tenant_ZipCode} onChange={handleChange} placeholder="Enter Zipcode" />
          </div>
          <div className="mb-3">
            <label className="form-label">Max Plant Count *</label>
            <input name="Max_Plant_Count" type="number" className="form-control" value={form.Max_Plant_Count} onChange={handleChange} placeholder="Enter Maximum Plant" />
          </div>
        </div>
        {/* Right section */}
        <div>
          <div className="mb-3">
            <label className="form-label">Tenant Name *</label>
            <input name="Tenant_Name" type="text" className="form-control" required value={form.Tenant_Name} onChange={handleChange} placeholder="Enter Tenant Name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Address *</label>
            <input name="Tenant_Address1" type="text" className="form-control" required value={form.Tenant_Address1} onChange={handleChange} placeholder="Street / Area / Landmark"/>
          </div>
          <div className="mb-3">
            <label className="form-label">State *</label>
            <input name="Tenant_State" type="text" className="form-control" value={form.Tenant_State} onChange={handleChange} placeholder="Enter State"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Website *</label>
            <input name="Tenant_Website" type="text" className="form-control" value={form.Tenant_Website} onChange={handleChange} placeholder="Enter Website URL"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Alternate Phone</label>
            <input name="Tenant_Phone3" type="text" className="form-control" value={form.Tenant_Phone3} onChange={handleChange} placeholder="Enter Alternate Phone"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Fax</label>
            <input name="Tenant_Fax" type="text" className="form-control" value={form.Tenant_Fax} onChange={handleChange} placeholder="Enter Fax"/>
          </div>
          <div className="mb-3">
            <label className="form-label">Upload Logo *</label>
            <input name="Tenant_Logo" type="file" className="form-control" accept="image/*" onChange={handleChange} />
            {logoPreview && (
              <div>
                <img src={logoPreview} alt="Logo Preview" style={{ width: "120px", marginTop: 8, borderRadius: 5 }} />
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Founded Date</label>
            <input name="Tenant_Founded_Date" type="date" className="form-control" value={form.Tenant_Founded_Date} onChange={handleChange} />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <input name="Tenant_Is_Approved" type="checkbox" className="form-check-input me-2" checked={form.Tenant_Is_Approved} onChange={handleChange} />
            <label className="form-label mb-0">Is Approved?</label>
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <input name="Status" type="text" className="form-control" value={form.Status} onChange={handleChange} placeholder="Status" />
          </div>
        </div>
      </div>
      <div className="mb-3 mt-3">
        <label className="form-label">Notes *</label>
        <textarea name="Notes" className="form-control" value={form.Notes} onChange={handleChange} rows={2} placeholder="Enter Note" />
      </div>
      <div className="d-flex justify-content-end gap-2" style={{ marginTop: 16 }}>
        <button type="submit" className="btn btn-primary">{editingId ? 'Save' : 'Upload & Save'}</button>
        {onClose && <button type="button" className="btn btn-secondary" onClick={onClose}>Clear</button>}
      </div>
    </form>
  );
}

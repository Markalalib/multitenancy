import React, { useState } from "react";
import axios from "axios";

export default function TenantForm() {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
            ? 1
            : 0
          : type === "file"
          ? files[0]
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/tenant/save",
        formData
      );
      alert(res.data.message || "Tenant saved successfully!");
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
    <div className="container mt-5">
      <div className="card shadow border-primary">
        <div className="card-header bg-primary text-white text-center">
          <h4>Tenant Form</h4>
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
                  onChange={handleChange}
                  placeholder="Enter Tenant Name"
                  className="form-control"
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
                  placeholder="Enter Short Name"
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
                  placeholder="Street / Area / Landmark"
                  className="form-control"
                />
              </div>

              {/* City */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">City</label>
                <input
                  type="text"
                  name="p_Tenant_City"
                  value={formData.p_Tenant_City}
                  onChange={handleChange}
                  placeholder="Enter City"
                  className="form-control"
                />
              </div>

              {/* Country */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Country *</label>
                <input
                  type="text"
                  name="p_Tenant_Country"
                  value={formData.p_Tenant_Country}
                  onChange={handleChange}
                  placeholder="Enter Country"
                  className="form-control"
                />
              </div>

              {/* State */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">State *</label>
                <input
                  type="text"
                  name="p_Tenant_State"
                  value={formData.p_Tenant_State}
                  onChange={handleChange}
                  placeholder="Enter State"
                  className="form-control"
                />
              </div>

              {/* Zipcode */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Zip Code</label>
                <input
                  type="text"
                  name="p_Tenant_ZipCode"
                  value={formData.p_Tenant_ZipCode}
                  onChange={handleChange}
                  placeholder="Enter Zipcode"
                  className="form-control"
                />
              </div>

              {/* Phone Fields */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Primary Phone *
                </label>
                <input
                  type="text"
                  name="p_Tenant_Phone1"
                  value={formData.p_Tenant_Phone1}
                  onChange={handleChange}
                  placeholder="Enter Phone"
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Office Phone</label>
                <input
                  type="text"
                  name="p_Tenant_Phone2"
                  value={formData.p_Tenant_Phone2}
                  onChange={handleChange}
                  placeholder="Enter Office Phone"
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Alternate Phone
                </label>
                <input
                  type="text"
                  name="p_Tenant_Phone3"
                  value={formData.p_Tenant_Phone3}
                  onChange={handleChange}
                  placeholder="Enter Alternate Phone"
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Fax</label>
                <input
                  type="text"
                  name="p_Tenant_Fax"
                  value={formData.p_Tenant_Fax}
                  onChange={handleChange}
                  placeholder="Enter Fax Number"
                  className="form-control"
                />
              </div>

              {/* Email */}
              <div className="col-12">
                <label className="form-label fw-semibold">Email *</label>
                <input
                  type="email"
                  name="p_Tenant_Contact_Email"
                  value={formData.p_Tenant_Contact_Email}
                  onChange={handleChange}
                  placeholder="Enter Email"
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
                  placeholder="Enter Website URL"
                  className="form-control"
                />
              </div>

              {/* Logo */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Logo</label>
                <input
                  type="file"
                  name="p_Tenant_Logo"
                  onChange={handleChange}
                  className="form-control"
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
                <label className="form-label fw-semibold">
                  Max Plant Count
                </label>
                <input
                  type="number"
                  name="p_Max_Plant_Count"
                  value={formData.p_Max_Plant_Count}
                  onChange={handleChange}
                  placeholder="Enter Max Plant Count"
                  className="form-control"
                />
              </div>

              {/* Approved */}
              <div className="col-md-6 d-flex align-items-center">
                <div className="form-check mt-3">
                  <input
                    type="checkbox"
                    name="p_Tenant_Is_Approved"
                    checked={formData.p_Tenant_Is_Approved === 1}
                    onChange={handleChange}
                    className="form-check-input"
                    id="isApproved"
                  />
                  <label
                    htmlFor="isApproved"
                    className="form-check-label fw-semibold"
                  >
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
                  placeholder="Enter Notes"
                  className="form-control"
                  rows="4"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="col-12 d-flex justify-content-end mt-3 gap-2">
                <button type="submit" className="btn btn-primary">
                  Save Tenant
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

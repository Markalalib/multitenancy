import React, { useState } from "react";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { getCode } from "country-list";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/bootstrap.css';

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
    if (name === "p_Tenant_ZipCode" || name === "p_Max_Plant_Count") {
      // Numbers only, for zipcode and count
      setFormData({ ...formData, [name]: value.replace(/\D/g, "") });
    } else if (name === "p_Tenant_Fax") {
      // Fax: numbers, spaces, dashes allowed
      setFormData({ ...formData, [name]: value.replace(/[^0-9 -]/g, "") });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? (checked ? 1 : 0)
          : type === "file" ? files[0]
          : value
      });
    }
  };

  // For react-phone-input-2 fields:
  const handlePhoneInput = (val, country, e, field) => {
    setFormData({ ...formData, [field]: val });
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
          <form onSubmit={handleSubmit} autoComplete="off">
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
                  required
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

              {/* Country WITH FLAG */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Country *</label>
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    name="p_Tenant_Country"
                    value={formData.p_Tenant_Country}
                    onChange={handleChange}
                    placeholder="Enter Country"
                    className="form-control me-2"
                    required
                  />
                  {formData.p_Tenant_Country && getCode(formData.p_Tenant_Country.trim()) && (
                    <ReactCountryFlag
                      countryCode={getCode(formData.p_Tenant_Country.trim())}
                      svg
                      style={{
                        width: "2em",
                        height: "2em",
                        borderRadius: "3px"
                      }}
                      title={formData.p_Tenant_Country}
                    />
                  )}
                </div>
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
                  required
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
                  pattern="\d{4,10}"
                  title="Enter only numbers"
                  maxLength={10}
                />
              </div>

              {/* Primary Phone */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Primary Phone *</label>
                <PhoneInput
                  country={'in'}
                  inputProps={{
                    name: 'p_Tenant_Phone1',
                    required: true,
                    className: "form-control",
                  }}
                  value={formData.p_Tenant_Phone1}
                  onChange={(val, country, e) =>
                    handlePhoneInput(val, country, e, "p_Tenant_Phone1")
                  }
                  inputClass="w-100"
                  enableAreaCodes
                />
              </div>

              {/* Office Phone */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Office Phone</label>
                <PhoneInput
                  country={'in'}
                  inputProps={{
                    name: 'p_Tenant_Phone2',
                    className: "form-control",
                  }}
                  value={formData.p_Tenant_Phone2}
                  onChange={(val, country, e) =>
                    handlePhoneInput(val, country, e, "p_Tenant_Phone2")
                  }
                  inputClass="w-100"
                  enableAreaCodes
                />
              </div>

              {/* Alternate Phone */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Alternate Phone</label>
                <PhoneInput
                  country={'in'}
                  inputProps={{
                    name: 'p_Tenant_Phone3',
                    className: "form-control",
                  }}
                  value={formData.p_Tenant_Phone3}
                  onChange={(val, country, e) =>
                    handlePhoneInput(val, country, e, "p_Tenant_Phone3")
                  }
                  inputClass="w-100"
                  enableAreaCodes
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
                  placeholder="Format: 12345 67890"
                  className="form-control"
                  pattern="[\d -]+"
                  maxLength={20}
                  title="Numbers, spaces, and dashes allowed"
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
                  required
                />
              </div>

              {/* Website */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Website</label>
                <input
                  type="url"
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
                  accept="image/*"
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
                  min={0}
                  max={99999}
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

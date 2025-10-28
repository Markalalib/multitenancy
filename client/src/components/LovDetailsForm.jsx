import React, { useState } from "react";
import axios from "axios";

export default function LovDetailsForm() {
  const [formData, setFormData] = useState({
    LOV_Details_ID: 0,
    LOV_ID: 1,
    LOV_Details_Name: "",
    LOV_Details_Description: "",
    Effective_From: "",
    Is_Editable: 1,
    Effective_To: "",
    IsData_Changed: 0,
    Status: 1,
    Notes: "",
    User: 1001,
  });

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
        "http://localhost:5000/api/lov/lov-details",
        formData
      );
      alert(res.data.message || "LOV Details saved successfully!");
      console.log("Response:", res.data);
    } catch (error) {
      console.error(error);
      alert("Error saving LOV Details data");
    }
  };

  const handleClear = () => {
    setFormData({
      LOV_Details_ID: 0,
      LOV_ID: 1,
      LOV_Details_Name: "",
      LOV_Details_Description: "",
      Effective_From: "",
      Is_Editable: 1,
      Effective_To: "",
      IsData_Changed: 0,
      Status: 1,
      Notes: "",
      User: 1001,
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-success">
        <div className="card-header bg-success text-white text-center">
          <h4>LOV Details Form</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* LOV ID */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">LOV ID *</label>
                <input
                  type="number"
                  name="LOV_ID"
                  value={formData.LOV_ID}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* LOV Details Name */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  LOV Details Name *
                </label>
                <input
                  type="text"
                  name="LOV_Details_Name"
                  value={formData.LOV_Details_Name}
                  onChange={handleChange}
                  placeholder="Enter Details Name"
                  className="form-control"
                  required
                />
              </div>

              {/* Description */}
              <div className="col-12">
                <label className="form-label fw-semibold">
                  LOV Details Description
                </label>
                <input
                  type="text"
                  name="LOV_Details_Description"
                  value={formData.LOV_Details_Description}
                  onChange={handleChange}
                  placeholder="Enter Description"
                  className="form-control"
                />
              </div>

              {/* Effective From */}
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

              {/* Effective To */}
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

              {/* Data Changed */}
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

              {/* Status */}
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
                  rows="3"
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
                <button type="submit" className="btn btn-success">
                  Save LOV Details
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

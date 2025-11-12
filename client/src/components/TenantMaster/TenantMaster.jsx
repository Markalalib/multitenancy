import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TenantMaster.css";

export default function TenantMaster({ handleEdit }) {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const loadTenants = () => {
    setLoading(true);
    setError("");
    axios
      .get("http://localhost:5000/api/tenants/list")
      .then((res) => {
        const data = res.data.data;
        setTenants(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load tenants.");
        setTenants([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadTenants();
  }, []);

  const handleDelete = async (tenantId) => {
    if (!window.confirm("Are you sure you want to delete this tenant?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tenants/${tenantId}`);
      loadTenants();
    } catch {
      alert("Failed to delete tenant.");
    }
  };

  return (
    <div className="tenant-page-container">
      <div className="tenant-header d-flex justify-content-between align-items-center mb-3">
        <h4 className="tenant-title">🏢  TenantMaster</h4>
        <button
          className="btn btn-gradient"
          onClick={() => handleEdit(null)}
        >
          
        </button>
      </div>

      {loading ? (
        <div className="py-4 text-center text-secondary">Loading tenants...</div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : tenants.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered align-middle tenant-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Country</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Website</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <tr key={t.Tenant_ID}>
                  <td>{t.Serial_No}</td>
                  <td>{t.Tenant_Code || "-"}</td>
                  <td>{t.Tenant_Name || "-"}</td>
                  <td>{t.Tenant_Address || "-"}</td>
                  <td>{t.Tenant_City || "-"}</td>
                  <td>{t.Tenant_Country || "-"}</td>
                  <td>{t.Tenant_Phone || "-"}</td>
                  <td>{t.Tenant_Email || "-"}</td>
                  <td>{t.Tenant_Website || "-"}</td>
                  <td>{t.Created_Date || "-"}</td>
                  <td>{t.Status || "-"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(t.Tenant_ID)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(t.Tenant_ID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-muted py-4">No tenants found.</div>
      )}
    </div>
    
  );
}

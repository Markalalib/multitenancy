import React, { useState, useEffect } from "react";
import TenantForm from "../../components/TenantForm/TenantForm";
import axios from "axios";
import "./Tenants.css";

export default function Tenants() {
  const [tenants, setTenants] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = () => {
    setLoading(true);
    setError("");
    axios
      .get("/api/tenant")
      .then((res) => {
        const data = res.data;
        setTenants(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load tenants.");
        setTenants([]);
        setLoading(false);
      });
  };

  const reload = () => {
    loadTenants();
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="tenant-page">
      {/* Header Section */}
      <div className="tenant-header">
        <h4 className="tenant-title">Tenant Management</h4>
        <button
          className="add-tenant-btn"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          + Add Tenant
        </button>
      </div>

      {/* Tenant Form */}
      {showForm && (
        <div className="tenant-form-container card p-4 mb-4">
          <TenantForm
            editingId={editing}
            onSuccess={reload}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Tenant List */}
      <div className="tenant-table card p-0">
        {loading ? (
          <div className="py-4 text-center text-muted">Loading tenants...</div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : tenants.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Prefix</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Short Name</th>
                  <th>Address</th>
                  <th>Country</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Zip</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Website</th>
                  <th>Approved</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((t) => (
                  <tr key={t.Tenant_ID}>
                    <td>{t.Tenant_Prefix_ID}</td>
                    <td>{t.Tenant_Code}</td>
                    <td>{t.Tenant_Name}</td>
                    <td>{t.Tenant_Short_Name}</td>
                    <td>{t.Tenant_Address1}</td>
                    <td>{t.Tenant_Country}</td>
                    <td>{t.Tenant_State}</td>
                    <td>{t.Tenant_City}</td>
                    <td>{t.Tenant_ZipCode}</td>
                    <td>{t.Tenant_Phone1}</td>
                    <td>{t.Tenant_Contact_Email}</td>
                    <td>{t.Tenant_Website}</td>
                    <td>{t.Tenant_Is_Approved ? "Yes" : "No"}</td>
                    <td>{t.Status}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => {
                          setEditing(t.Tenant_ID);
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={async () => {
                          await axios.delete(`/api/tenant/${t.Tenant_ID}`);
                          reload();
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}

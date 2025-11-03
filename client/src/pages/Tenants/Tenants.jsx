// src/pages/Tenants/Tenants.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TenantForm from "../../components/TenantForm/TenantForm";
import TenantTabs from "../../components/Tenanttabs/TenantTabs"; // keep your tabs
import "./Tenants.css";

export default function Tenants() {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("http://localhost:5000/api/tenants/list");
      if (res.data?.success && Array.isArray(res.data.data)) {
        setTenants(res.data.data);
      } else {
        setTenants([]);
        setError("No tenants found.");
      }
    } catch (err) {
      console.error("❌ Failed to load tenants:", err);
      setError("Failed to load tenants.");
      setTenants([]);
    } finally {
      setLoading(false);
    }
  };

  const reload = () => {
    fetchTenants();
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="container mt-4 bg-white rounded-xl p-6 shadow tenant-page">
      {/* Tabs */}
      <TenantTabs activeTab="tenantMaster" />

      {/* Header */}
      <div className="tenant-header d-flex justify-content-between align-items-center mb-4">
        <h4 className="tenant-title text-gradient">Tenant Management</h4>
        <button
          className="add-tenant-btn btn btn-primary"
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

      {/* Table Section */}
      {loading ? (
        <div className="text-center py-4">Loading tenants...</div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : tenants.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Founded Date</th>
                <th>Email</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t, index) => (
                <tr key={t.Tenant_ID}>
                  <td>{index + 1}</td>
                  <td>{t.Tenant_Code}</td>
                  <td>{t.Tenant_Name}</td>
                  <td>{t.Tenant_Address}</td>
                  <td>{t.Tenant_Phone}</td>
                  <td>{t.Tenant_Founded_Date}</td>
                  <td>{t.Tenant_Email}</td>
                  <td>{t.Created_Date}</td>
                  <td>{t.Tenant_Status}</td>
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
                        await axios.delete(
                          `http://localhost:5000/api/tenants/${t.Tenant_ID}`
                        );
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
      ) : (
        <div className="text-center text-muted py-4">No tenants found.</div>
      )}
    </div>
  );
}

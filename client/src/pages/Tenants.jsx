// src/pages/Tenants.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TenantForm from "../components/TenantForm";


export default function Tenants() {
  const [activeTab, setActiveTab] = useState("tenantMaster"); // 'dashboard' | 'tenantMaster' | 'createEditTenant'
  const [tenants, setTenants] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (activeTab === "tenantMaster") {
      loadTenants();
    }
  }, [activeTab]);
  
  const loadTenants = () => {
  setLoading(true);
  setError("");
  axios
    .get("http://localhost:5000/api/tenants/list")
    .then((res) => {
      const data = res.data.data; // ✅ correct line here
      console.log("Tenants Loaded:", data);
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
    setActiveTab("tenantMaster");
  };

  return (
    <div
      className="container-fluid mt-4"
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 2px 8px #0001",
      }}


      
    >
      {/* 🔹 Top Tabs */}
      <div className="d-flex gap-2 mb-4 border-bottom pb-2">
        <button
          className={`btn ${
            activeTab === "dashboard" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          <i className="bi bi-speedometer2 me-2"></i> Dashboard
        </button>
        <button
          className={`btn ${
            activeTab === "tenantMaster" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("tenantMaster")}
        >
          <i className="bi bi-building me-2"></i> Tenant Master
        </button>
        <button
          className={`btn ${
            activeTab === "createEditTenant"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => {
            setEditing(null);
            setActiveTab("createEditTenant");
          }}
        >
          <i className="bi bi-pencil-square me-2"></i> Create / Edit Tenant
        </button>
      </div>

      {/* 🔹 Tab Content */}
      {activeTab === "dashboard" && (
        <div className="text-center py-5">
          <h4>📊 Tenant Dashboard (Coming Soon)</h4>
        </div>
      )}

      {activeTab === "tenantMaster" && (
  <>
    {loading ? (
      <div className="py-4 text-center">Loading tenants...</div>
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
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => {
                      setEditing(t.Tenant_ID);
                      setActiveTab("createEditTenant");
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={async () => {
                      await axios.delete(`/api/tenants/${t.Tenant_ID}`);
                      loadTenants();
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
      <div className="text-center text-muted py-4">No Tenants found.</div>
    )}
  </>
)}

      {activeTab === "createEditTenant" && (
        <TenantForm
          editingId={editing}
          onSuccess={reload}
          onClose={() => setActiveTab("tenantMaster")}
        />
      )}
    </div>
  );
}

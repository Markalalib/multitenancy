// src/pages/Tenants.jsx
import React, { useState } from "react";
import TenantMaster from "../../components/TenantMaster/TenantMaster";
import TenantForm from "../../components/TenantForm/TenantForm";

export default function Tenants() {
  const [activeTab, setActiveTab] = useState("tenantMaster");
  const [editing, setEditing] = useState(null);

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
          <i className="bi bi-building me-2"></i>Tenant Master
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
        <TenantMaster
          handleEdit={(tenantId) => {
            setEditing(tenantId);
            setActiveTab("createEditTenant");
          }}
        />
      )}

      {activeTab === "createEditTenant" && (
        <TenantForm
          editingId={editing}
          onSuccess={() => setActiveTab("tenantMaster")}
          onClose={() => setActiveTab("tenantMaster")}
        />
      )}
    </div>
  );
}

// components/TenantTabs.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./TenantTabs.css";

export default function TenantTabs({ activeTab }) {
  const navigate = useNavigate();
  const tabs = [
    { id: "dashboard", label: "Dashboard", path: "/" },
    { id: "tenantMaster", label: "Tenant Master", path: "/tenant-master" },
    { id: "createEditTenant", label: "Create/ Edit Tenant", path: "/tenant-form" },
  ];

  return (
    <div className="tenant-tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => navigate(tab.path)}
          className={`tenant-tab-btn ${activeTab === tab.id ? "active" : ""}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

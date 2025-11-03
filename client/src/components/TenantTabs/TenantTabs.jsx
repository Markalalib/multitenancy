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
    <div className="flex gap-2 border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => navigate(tab.path)}
          className={`px-5 py-2 rounded-t-lg font-medium transition-all duration-200
            ${
              activeTab === tab.id
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

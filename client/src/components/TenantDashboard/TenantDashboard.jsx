// src/pages/TenantDashboard.jsx
import React from "react";
import "./TenantDashboard.css";

export default function TenantDashboard() {
  return (
    <div className="tenant-dashboard text-center py-5">
      <h3 className="mb-3">📊 Tenant Dashboard</h3>
      <p className="text-muted">
        Summary of tenant statistics, performance, and key metrics will appear
        here soon.
      </p>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>24</h4>
          <p>Total Tenants</p>
        </div>
        <div className="stat-card">
          <h4>18</h4>
          <p>Active</p>
        </div>
        <div className="stat-card">
          <h4>6</h4>
          <p>Inactive</p>
        </div>
      </div>
    </div>
  );
}

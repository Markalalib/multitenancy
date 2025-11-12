import React, { useState } from "react";
import RoleMaster from "./RoleMaster";
import RoleForm from "./RoleForm";

const RoleTabs = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [refresh, setRefresh] = useState(false);
  const [editRole, setEditRole] = useState(null);

  // handle edit click from grid
  const handleEdit = (role) => {
    setEditRole(role);
    setActiveTab("createEdit");
  };

  // handle success (after add/edit)
  const handleSuccess = () => {
    setRefresh((prev) => !prev);
    setEditRole(null);
    setActiveTab("grid");
  };

  return (
    <div className="container mt-4">
      {/* Tabs Navigation */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Role Dashboard
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "grid" ? "active" : ""}`}
            onClick={() => {
              setEditRole(null);
              setActiveTab("grid");
            }}
          >
            Role Master Grid
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "createEdit" ? "active" : ""}`}
            onClick={() => {
              setEditRole(null);
              setActiveTab("createEdit");
            }}
          >
            Create / Edit
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="card shadow-sm p-4">
        {activeTab === "dashboard" && (
          <div className="text-muted">
            <h5>Role Dashboard</h5>
            <p>Coming soon...</p>
          </div>
        )}

        {activeTab === "grid" && (
          <RoleMaster refresh={refresh} onEdit={handleEdit} />
        )}

        {activeTab === "createEdit" && (
          <RoleForm role={editRole} onSuccess={handleSuccess} />
        )}
      </div>
    </div>
  );
};

export default RoleTabs;

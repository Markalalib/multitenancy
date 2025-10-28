// src/App.js
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import TenantPage from "./pages/Tenants";
import LovPage from "./pages/LovPage";
import LovDetailsPage from "./pages/LovDetailsPage";

export default function App() {
  const [page, setPage] = useState(""); // will hold Function_Action like "/tenant" or "/list-of-values"

  const renderPage = () => {
    switch (page) {
      case "/tenant":
        return <TenantPage />;
      case "/list-of-values":
        return <LovPage />;
      // add more mappings below
      case "/list-of-value-detail":
        return <LovDetailsPage />;
      default:
        return (
          <div className="p-4 text-center">
            <h4>Select a menu item to start</h4>
          </div>
        );
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar setPage={setPage} />

      {/* Page Content */}
      <div className="flex-grow-1 p-4" style={{ background: "#f8f9fa" }}>
        {renderPage()}
      </div>
    </div>
  );
}

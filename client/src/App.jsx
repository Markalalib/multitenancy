// src/App.js
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Tenants from "./pages/Tenants";
import LovPage from "./pages/LovPage";
import LovDetailsPage from "./pages/LovDetailsPage";

export default function App() {
  const [page, setPage] = useState(""); // will hold current page route like "/tenant"

  const renderPage = () => {
    switch (page) {
      case "/tenant":
        return <Tenants />; // <-- your main tenant page that has Master + Form tabs
      case "/list-of-values":
        return <LovPage />;
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
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar Navigation */}
      <Sidebar setPage={setPage} />

      {/* Main Page Container */}
      <div
        className="flex-grow-1 p-4"
        style={{ background: "#f8f9fa", overflowY: "auto" }}
      >
        {renderPage()}
      </div>
    </div>
  );
}

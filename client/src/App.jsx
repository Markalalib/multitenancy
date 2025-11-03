// src/App.js
import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import TenantPage from "./pages/Tenants/Tenants";
import LovPage from "./pages/LovPage/LovPage";
import LovDetailsPage from "./pages/LovDetailsPage/LovDetailsPage";
import "./index.css"; // global theme

export default function App() {
  const [page, setPage] = useState("");

  const renderPage = () => {
    switch (page) {
      case "/tenant":
        return <TenantPage />;
      case "/list-of-values":
        return <LovPage />;
      case "/list-of-value-detail":
        return <LovDetailsPage />;
      
      default:
        
    }
  };

  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <div className="app-container">
      <Sidebar setPage={setPage} />
      <div className="flex-grow-1">
        <Navbar onLogout={handleLogout} />
        <div className="page-content">{renderPage()}</div>
      </div>
    </div>
  );
}

// src/App.js
import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Tenants from "./pages/Tenants/Tenants";
import LovPage from "./pages/LovPage/LovPage";
import LovDetailsPage from "./pages/LovDetailsPage/LovDetailsPage";
import LoginPage from "./pages/LoginPage/LoginPage"; // ✅ import your login page
import Roles from "./pages/Roles/Roles";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function App() {
  const [page, setPage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ track login state

  // ✅ Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("🔒 Logged out!");
  };

  // ✅ Handle login success
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // ✅ Page routing logic
  const renderPage = () => {
    switch (page) {
      case "/tenant":
        return <Tenants />;
      case "/list-of-values":
        return <LovPage />;
      case "/list-of-value-detail":
        return <LovDetailsPage />
      case "/role":
        return <Roles />;
      default:
        return <div className="text-center mt-5">Please select a page.</div>;
    }
  };

  // ✅ If not logged in → show LoginPage
  if (!isLoggedIn) {
     return <LoginPage onLogin={handleLogin} />;
  }

  // ✅ If logged in → show full app layout
  return (
    <div className="app-container d-flex">
      <Sidebar setPage={setPage} />
      <div className="flex-grow-1">
        <Navbar onLogout={handleLogout} />
        <div className="page-content mt-5 p-4">{renderPage()}
      \
       
        </div>
      </div>
    </div>
  );
}

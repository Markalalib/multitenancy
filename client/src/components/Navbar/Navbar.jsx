// src/components/Navbar.jsx
import React from "react";
import "./Navbar.css";

export default function Navbar({ onLogout }) {
  return (
    <nav className="navbar-custom d-flex justify-content-between align-items-center px-4 py-2 shadow-sm">
      <div className="navbar-title fw-semibold">Lami CNC Panel</div>

      <div className="d-flex align-items-center gap-3">
        <span className="user-name">Welcome, Admin</span>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

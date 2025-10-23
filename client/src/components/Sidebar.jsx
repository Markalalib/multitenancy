import React from "react";

export default function Sidebar({ setPage }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        minWidth: "220px",
        borderRight: "2px solid #276bfd",
        padding: "2rem 1rem 1rem 1rem",
        boxShadow: "2px 0 10px #276bfd10",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
      }}
    >
      <h3 style={{ color: "#276bfd", fontWeight: "bold" }}>Lami CNC Panel</h3>
      <button
        className="btn btn-primary my-2 w-100"
        onClick={() => setPage("tenants")}
      >
        Tenants
      </button>
      <button
        className="btn btn-outline-primary my-2 w-100"
        onClick={() => setPage("dashboard")}
      >
        Dashboard
      </button>
      <button
        className="btn btn-outline-primary my-2 w-100"
        onClick={() => setPage("settings")}
      >
        Settings
      </button>
    </div>
  );
}

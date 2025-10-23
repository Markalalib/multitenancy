import React, { useState } from "react";
import Tenants from "./pages/Tenants";
import Sidebar from "./components/Sidebar";
import "./index.css";

function App() {
  const [page, setPage] = useState("tenants");
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#e8effa" }}>
      <Sidebar setPage={setPage} />
      <div style={{ flex: 1 }}>
        {page === "tenants" && <Tenants />}
        {page === "dashboard" && (
          <div className="container mt-4">
            <h2 style={{ color: "#276bfd" }}>Dashboard (coming soon)</h2>
          </div>
        )}
        {page === "settings" && (
          <div className="container mt-4">
            <h2 style={{ color: "#276bfd" }}>Settings (coming soon)</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

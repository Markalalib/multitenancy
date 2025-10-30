import React from "react";

export default function TenantMaster({ onClick }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        border: "2px dashed #9d8aff",
        borderRadius: "12px",
        minHeight: "120px",
        background: "#f7f7ff",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        boxShadow: "0 2px 10px #0001",
      }}
      onClick={onClick}
    >
      {/* Empty box, ready for use */}
    </div>
  );
}

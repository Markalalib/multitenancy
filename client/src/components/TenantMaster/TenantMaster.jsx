// pages/TenantMaster.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TenantTabs from "../components/TenantTabs/TenantTabs";

export default function TenantMaster() {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/tenants/list");
        if (res.data?.success && Array.isArray(res.data.data)) {
          setTenants(res.data.data);
        } else {
          setTenants([]);
          setError("No tenants found.");
        }
      } catch (err) {
        console.error("❌ Failed to load tenants:", err);
        setError("Failed to load tenants.");
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  return (
    <div className="container mt-4 bg-white rounded-xl p-6 shadow">
      <TenantTabs activeTab="tenantMaster" />

      {loading ? (
        <div className="text-center py-4">Loading tenants...</div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : tenants.length > 0 ? (
        <table className="table table-bordered align-middle">
          <thead className="table-light">
  <tr>
    <th>#</th>
    <th>Code</th>
    <th>Name</th>
    <th>Address</th>
    <th>Phone</th>
    <th>Founded Date</th>
    <th>Email</th>
    <th>Created Date</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  {tenants.map((t) => (
    <tr key={t.Tenant_ID}>
      <td>{t.Serial_No}</td>
      <td>{t.Tenant_Code}</td>
      <td>{t.Tenant_Name}</td>
      <td>{t.Tenant_Address}</td>
      <td>{t.Tenant_Phone}</td>
      <td>{t.Tenant_Founded_Date}</td>
      <td>{t.Tenant_Email}</td>
      <td>{t.Created_Date}</td>
      <td>{t.Tenant_Status}</td>
      <td>
        <button
          className="btn btn-sm btn-warning me-2"
          onClick={() => navigate(`/tenant-form/${t.Tenant_ID}`)}
        >
          Edit
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      ) : (
        <div className="text-center text-muted py-4">No tenants found.</div>
      )}
    </div>
  );
}

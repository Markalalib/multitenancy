import React, { useState, useEffect } from "react";
import TenantForm from "../components/TenantForm";
import axios from "axios";

export default function Tenants() {
  const [tenants, setTenants] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true); setError('');
    axios.get("/api/tenant")
      .then(res => {
        const data = res.data;
        setTenants(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => { setError("Failed to load tenants."); setTenants([]); setLoading(false); });
  }, []);

  const reload = () => {
    setLoading(true); setError('');
    axios.get("/api/tenant")
      .then(res => {
        const data = res.data;
        setTenants(Array.isArray(data) ? data : []);
        setLoading(false); setShowForm(false); setEditing(null);
      })
      .catch(() => { setError("Failed to load tenants."); setTenants([]); setLoading(false); setShowForm(false); setEditing(null); });
  };

  return (
    <div className="container mt-4" style={{ background: "#fff", borderRadius: "12px", padding: "2rem", boxShadow: "0 2px 8px #0001" }}>
      <button
        className="btn btn-primary mb-3"
        onClick={() => { setEditing(null); setShowForm(true); }}
      >
        Add Tenant
      </button>
      {loading ? (
        <div className="py-4 text-center">Loading tenants...</div>
      ) : (
        <>
          {error && <div className="alert alert-danger">{error}</div>}
          {tenants.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Prefix</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Short Name</th>
                    <th>Address</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Zip</th>
                    <th>Phone 1</th>
                    <th>Phone 2</th>
                    <th>Phone 3</th>
                    <th>Fax</th>
                    <th>Website</th>
                    <th>Founded</th>
                    <th>Email</th>
                    <th>Logo</th>
                    <th>Plant</th>
                    <th>Approved</th>
                    <th>Status</th>
                    <th>Notes</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tenants.map(t => (
                    <tr key={t.Tenant_ID}>
                      <td>{t.Tenant_Prefix_ID}</td>
                      <td>{t.Tenant_Code}</td>
                      <td>{t.Tenant_Name}</td>
                      <td>{t.Tenant_Short_Name}</td>
                      <td>{t.Tenant_Address1}</td>
                      <td>{t.Tenant_Country}</td>
                      <td>{t.Tenant_State}</td>
                      <td>{t.Tenant_City}</td>
                      <td>{t.Tenant_ZipCode}</td>
                      <td>{t.Tenant_Phone1}</td>
                      <td>{t.Tenant_Phone2}</td>
                      <td>{t.Tenant_Phone3}</td>
                      <td>{t.Tenant_Fax}</td>
                      <td>{t.Tenant_Website}</td>
                      <td>{t.Tenant_Founded_Date ? t.Tenant_Founded_Date.substring(0,10) : ""}</td>
                      <td>{t.Tenant_Contact_Email}</td>
                      <td>
                        {t.Tenant_Logo
                          ? <img src={`data:image/jpeg;base64,${t.Tenant_Logo}`} alt="Logo" style={{ width: "50px", borderRadius: "6px" }} />
                          : ""}
                      </td>
                      <td>{t.Max_Plant_Count}</td>
                      <td>{t.Tenant_Is_Approved ? "Yes" : "No"}</td>
                      <td>{t.Status}</td>
                      <td>{t.Notes}</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-1" onClick={() => { setEditing(t.Tenant_ID); setShowForm(true); }}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={async () => {
                          await axios.delete(`/api/tenant/${t.Tenant_ID}`);
                          reload();
                        }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-muted py-4">No tenants found.</div>
          )}
        </>
      )}
      {showForm && (
        <TenantForm
          editingId={editing}
          onSuccess={reload}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

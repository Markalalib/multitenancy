import React, { useEffect, useState } from "react";
import axios from "axios";

const RoleMaster = ({ refresh, onEdit }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/roles/roleGrid", {
        params: { User_ID: 1, Tenant_ID: 122 },
      });
      setRoles(res.data || []);
    } catch (err) {
      console.error("Error fetching roles:", err);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/roles/deleteRole/${id}`);
      alert("🗑️ Role deleted successfully");
      fetchRoles();
    } catch (err) {
      console.error("Error deleting role:", err);
      alert("❌ Failed to delete role");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [refresh]);

  return (
    <div>
      <h4 className="text-primary mb-3">Roles List</h4>
      {loading ? (
        <p>Loading...</p>
      ) : roles.length === 0 ? (
        <p className="text-muted">No roles found</p>
      ) : (
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-primary">
            <tr>
              <th>Role ID</th>
              <th>Role Name</th>
              <th>Description</th>
              <th>Level</th>
              <th>Max Users</th>
              <th>Status</th>
              <th>Valid From</th>
              <th>Valid To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.Role_ID}>
                <td>{role.Role_ID}</td>
                <td>{role.Role_Name}</td>
                <td>{role.Role_Description || "-"}</td>
                <td>{role.Role_Level || "-"}</td>
                <td>{role.MaxUsers || "-"}</td>
                <td>{role.Status === 1 ? "Active" : "Inactive"}</td>
                <td>
                  {role.Valid_From
                    ? new Date(role.Valid_From).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  {role.Valid_To
                    ? new Date(role.Valid_To).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(role)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(role.Role_ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoleMaster;

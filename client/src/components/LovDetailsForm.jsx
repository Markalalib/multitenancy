import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LovDetailsGridForm() {
  const [lovList, setLovList] = useState([]); // Dropdown data
  const [selectedLovId, setSelectedLovId] = useState("");
  const [records, setRecords] = useState([]);

  // Fetch dropdown list of LOVs
  useEffect(() => {
    const fetchLovList = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/lov/dropdown?listName=LOV_LIST"
        );
        if (res.data && res.data.success) {
          setLovList(res.data.data);
        } else {
          console.error("Unexpected response:", res.data);
        }
      } catch (error) {
        console.error("Error fetching LOV list", error);
      }
    };
    fetchLovList();
  }, []);

  // Add a new empty record row
  const handleAddRecord = () => {
    if (!selectedLovId) {
      alert("Please select a List of Value Name first!");
      return;
    }

    setRecords([
      ...records,
      {
        LOV_Details_ID: 0,
        LOV_ID: selectedLovId || 0,
        LOV_Details_Name: "",
        LOV_Details_Description: "",
      },
    ]);
  };

  // Handle grid input change
  const handleInputChange = (index, field, value) => {
    const updatedRecords = [...records];
    updatedRecords[index][field] = value;
    setRecords(updatedRecords);
  };

  // Delete a record row
  const handleDeleteRow = (index) => {
    setRecords(records.filter((_, i) => i !== index));
  };

  // Save all records
  const handleSave = async () => {
    if (!selectedLovId) {
      alert("Please select a List of Value Name first!");
      return;
    }

    const payload = records.map((rec) => ({
      ...rec,
      LOV_ID: selectedLovId,
      Effective_From: null,
      Effective_To: null,
      Is_Editable: 0,
      IsData_Changed: 0,
      Status: 1,
      Notes: "",
      User: 1001,
    }));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/lov/lov-details",
        payload
      );
      alert(res.data.message || "LOV Details saved successfully!");
      setRecords([]);
    } catch (error) {
      console.error(error);
      alert("Error saving LOV Details!");
    }
  };

  return (
    <div className="container mt-4">
      {/* Dropdown */}
      <div className="mb-3">
        <label className="form-label fw-semibold">List Of Value Name *</label>
        <select
          className="form-select"
          value={selectedLovId}
          onChange={(e) => setSelectedLovId(e.target.value)}
          required
        >
          <option value="">-- Select --</option>
          {lovList.map((lov) => (
            <option key={lov.Id} value={lov.Id}>
              {lov.Name}
            </option>
          ))}
        </select>
      </div>

      {/* Grid Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-primary" onClick={handleAddRecord}>
              + Add New Record
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              💾 Save
            </button>
          </div>

          <table className="table table-bordered table-striped">
            <thead className="table-primary text-center">
              <tr>
                <th>LOV Details Name</th>
                <th>LOV Details Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? (
                records.map((record, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={record.LOV_Details_Name}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "LOV_Details_Name",
                            e.target.value
                          )
                        }
                        className="form-control"
                        placeholder="Enter Name"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={record.LOV_Details_Description}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "LOV_Details_Description",
                            e.target.value
                          )
                        }
                        className="form-control"
                        placeholder="Enter Description"
                      />
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteRow(index)}
                      >
                        ✖
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No records added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

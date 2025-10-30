import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Sidebar.css";

export default function Sidebar({ setPage }) {
  const [menuData, setMenuData] = useState([]);
  const [openModules, setOpenModules] = useState({});
  const [openSubModules, setOpenSubModules] = useState({});


  // useEffect(() => {
    // const fetchMenuData = async () => {
    //   try {
    //     const res = await axios.get("http://localhost:5000/api/menu/menus");
    //     if (res.data.success) {
    //       const grouped = {};

    //       res.data.data.forEach((item) => {
    //         if (!grouped[item.Module_ID]) {
    //           grouped[item.Module_ID] = {
    //             Module_Name: item.Module_Name,
    //             SubModules: {},
    //           };
    //         }

    //         if (!grouped[item.Module_ID].SubModules[item.Sub_Module_ID]) {
    //           grouped[item.Module_ID].SubModules[item.Sub_Module_ID] = {
    //             Sub_Module_Name: item.Sub_Module_Name,
    //             Functions: [],
    //           };
    //         }

    //         grouped[item.Module_ID].SubModules[
    //           item.Sub_Module_ID
    //         ].Functions.push({
    //           Function_ID: item.Function_ID,
    //           Function_Title: item.Function_Title,
    //           Function_Action: item.Function_Action,
    //         });
    //       });

    //       setMenuData(Object.entries(grouped));
    //     } else {
    //       console.error("Menu API returned success: false");
    //     }
    //   } catch (err) {
    //     console.error("Error fetching menu data:", err);
    //   }
    // };

  //   fetchMenuData();
  // }, []);

  const toggleModule = (id) =>
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSubModule = (id) =>
    setOpenSubModules((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    
  <div className="sidebar">
  <h4 className="fw-bold text-white text-center mb-4">Lami CNC Panel</h4>

  {menuData.length === 0 ? (
    <div className="text-light small text-center">No menu data</div>
  ) : (
    menuData.map(([moduleId, module]) => (
      <div key={moduleId} className="mb-3">
        {/* Module */}
        <div
          onClick={() => toggleModule(moduleId)}
          className="nav-item fw-bold"
        >
          {openModules[moduleId] ? "▼" : "▶"} {module.Module_Name}
        </div>

        {/* Submodules */}
        {openModules[moduleId] &&
          Object.entries(module.SubModules).map(([subId, sub]) => (
            <div key={subId} className="ms-3 mt-1">
              <div
                onClick={() => toggleSubModule(subId)}
                className="nav-item text-light small fw-semibold"
              >
                {openSubModules[subId] ? "▼" : "▶"} {sub.Sub_Module_Name}
              </div>

              {/* Functions */}
              {openSubModules[subId] &&
                sub.Functions.map((f) => (
                  <div
                    key={f.Function_ID}
                    onClick={() => setPage(f.Function_Action)}
                    className="nav-item ms-4 text-light small"
                    style={{ cursor: "pointer" }}
                  >
                    • {f.Function_Title}
                  </div>
                ))}
            </div>
          ))}
      </div>
    ))
  )}
</div>

  );
}

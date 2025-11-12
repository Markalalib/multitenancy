// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Sidebar.css";

export default function Sidebar({ setPage }) {
  const [menuData, setMenuData] = useState([]);
  const [openModules, setOpenModules] = useState({});
  const [openSubModules, setOpenSubModules] = useState({});

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/menus/menus");
        if (res.data.success) {
          const grouped = {};
          res.data.data.forEach((item) => {
            if (!grouped[item.Module_ID]) {
              grouped[item.Module_ID] = {
                Module_Name: item.Module_Name,
                SubModules: {},
              };
            }
            if (!grouped[item.Module_ID].SubModules[item.Sub_Module_ID]) {
              grouped[item.Module_ID].SubModules[item.Sub_Module_ID] = {
                Sub_Module_Name: item.Sub_Module_Name,
                Functions: [],
              };
            }
            grouped[item.Module_ID].SubModules[item.Sub_Module_ID].Functions.push({
              Function_ID: item.Function_ID,
              Function_Title: item.Function_Title,
              Function_Action: item.Function_Action,
            });
          });
          setMenuData(Object.entries(grouped));
        } else {
          console.error("Menu API returned success: false");
        }
      } catch (err) {
        console.error("Error fetching menu data:", err);
      }
    };

    fetchMenuData();
  }, []);

  const toggleModule = (id) =>
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleSubModule = (id) =>
    setOpenSubModules((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="sidebar-container">
      <h4 className="sidebar-title">LAMI CNC PANEL</h4>

      {menuData.map(([moduleId, module]) => (
        <div key={moduleId} className="sidebar-module">
          {/* ---------- MODULE ---------- */}
          <div
            onClick={() => toggleModule(moduleId)}
            className={`module-title ${openModules[moduleId] ? "open" : ""}`}
          >
            <span className="arrow">{openModules[moduleId] ? "▼" : "▶"}</span>
            {module.Module_Name}
          </div>

          {/* ---------- SUBMODULES ---------- */}
          {openModules[moduleId] &&
            Object.entries(module.SubModules).map(([subId, sub]) => (
              <div key={subId} className="sidebar-submodule">
                <div
                  onClick={() => toggleSubModule(subId)}
                  className={`submodule-title ${
                    openSubModules[subId] ? "open" : ""
                  }`}
                >
                  <span className="arrow">
                    {openSubModules[subId] ? "▼" : "▶"}
                  </span>
                  {sub.Sub_Module_Name}
                </div>

                {/* ---------- FUNCTIONS ---------- */}
                {openSubModules[subId] &&
                  sub.Functions.map((f) => (
                    <div
                      key={f.Function_ID}
                      onClick={() => { 
                         console.log("Clicked:", f.Function_Action);
                        setPage(f.Function_Action)}
                      }
                      className="function-item"
                    >
                      {f.Function_Title}
                    </div>
                  ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar({ setPage }) {
  const [menuData, setMenuData] = useState([]);
  const [openModules, setOpenModules] = useState({});
  const [openSubModules, setOpenSubModules] = useState({});


  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/menu/menus");
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

            grouped[item.Module_ID].SubModules[
              item.Sub_Module_ID
            ].Functions.push({
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
    <div
      className="bg-light border-end vh-100 p-3"
      style={{ width: "260px", overflowY: "auto" }}
    >
      <h4 className="fw-bold text-primary mb-3">Lami CNC Panel</h4>

      {menuData.map(([moduleId, module]) => (
        <div key={moduleId} className="mb-2">
          {/* Module */}
          <div
            onClick={() => toggleModule(moduleId)}
            className="fw-bold text-primary d-flex align-items-center"
            style={{ cursor: "pointer" }}
          >
            <span className="me-2">{openModules[moduleId] ? "▼" : "▶"}</span>
            {module.Module_Name}
          </div>

          {/* Submodules */}
          {openModules[moduleId] &&
            Object.entries(module.SubModules).map(([subId, sub]) => (
              <div key={subId} className="ms-3 mt-1">
                <div
                  onClick={() => toggleSubModule(subId)}
                  className="text-secondary fw-semibold d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                >
                  <span className="me-2">
                    {openSubModules[subId] ? "▼" : "▶"}
                  </span>
                  {sub.Sub_Module_Name}
                </div>

                {/* Functions */}
                {openSubModules[subId] &&
                  sub.Functions.map((f) => (
                    <div
                      key={f.Function_ID}
                      onClick={() => setPage(f.Function_Action)}
                      className="ms-4 text-dark small py-1"
                      style={{ cursor: "pointer" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#0d6efd")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#000")
                      }
                    >
                      • {f.Function_Title}
                    </div>
                  ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

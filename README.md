import React, { useEffect, useState } from "react";
import axios from "axios";

// Utility: group rows by module, then submodule, then functions
function groupMenuData(flatData) {
  const moduleMap = {};
  flatData.forEach(row => {
    if (!row.ModuleID) return;
    if (!moduleMap[row.ModuleID]) {
      moduleMap[row.ModuleID] = {
        name: row.ModuleName,
        submodules: {},
      };
    }
    if (row.SubModuleID) {
      if (!moduleMap[row.ModuleID].submodules[row.SubModuleID]) {
        moduleMap[row.ModuleID].submodules[row.SubModuleID] = {
          name: row.SubModuleName,
          functions: [],
        };
      }
      if (row.FunctionID && row.FunctionTitle) {
        moduleMap[row.ModuleID].submodules[row.SubModuleID].functions.push({
          id: row.FunctionID,
          title: row.FunctionTitle,
        });
      }
    }
  });
  return moduleMap;
}

export default function DynamicSidebarMenu() {
  const [menu, setMenu] = useState({});
  const [openModules, setOpenModules] = useState({});
  const [openSubModules, setOpenSubModules] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/tenants/menu")
      .then(res => setMenu(groupMenuData(res.data)));
  }, []);

  const toggleModule = mid =>
    setOpenModules(open => ({ ...open, [mid]: !open[mid] }));
  const toggleSubModule = (mid, smid) =>
    setOpenSubModules(open => ({ ...open, [`${mid}-${smid}`]: !open[`${mid}-${smid}`] }));

  return (
    <div style={{ width: 260, background: "#f8faff", minHeight: "100vh", padding: 18 }}>
      <div style={{ fontWeight: "bold", fontSize: 22, color: "#1f51a8", marginBottom: 14 }}>
        Lami CNC Panel
      </div>
      {Object.entries(menu).map(([mid, m]) => (
        <div key={mid}>
          <div
            style={{ fontWeight: 700, color: "#2071e5", margin: "6px 0", cursor: "pointer" }}
            onClick={() => toggleModule(mid)}
          >
            <span style={{ marginRight: 7 }}>{openModules[mid] ? "▼" : "▶"}</span>
            {m.name}
          </div>
          {openModules[mid] &&
            <div style={{ marginLeft: 18 }}>
              {Object.entries(m.submodules).map(([smid, sm]) => (
                <div key={smid}>
                  <div
                    style={{ fontWeight: 600, color: "#2071e5", cursor: "pointer", margin: "2px 0" }}
                    onClick={() => toggleSubModule(mid, smid)}
                  >
                    <span style={{ marginRight: 7 }}>{openSubModules[`${mid}-${smid}`] ? "▼" : "▶"}</span>
                    {sm.name}
                  </div>
                  {openSubModules[`${mid}-${smid}`] &&
                    <ul style={{ marginLeft: 14, paddingLeft: 0, listStyle: "disc"}}>
                      {sm.functions.map(fn => (
                        <li key={fn.id} style={{ fontWeight: 400, color: "#1f1e1e" }}>{fn.title}</li>
                      ))}
                    </ul>
                  }
                </div>
              ))}
            </div>
          }
        </div>
      ))}
    </div>
  );
}

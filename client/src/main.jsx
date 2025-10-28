import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// src/index.js
import "bootstrap/dist/css/bootstrap.min.css";
// If you need JS components (modals, dropdowns), also import bundle:
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

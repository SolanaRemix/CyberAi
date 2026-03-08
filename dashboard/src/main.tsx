import React from "react";
import { createRoot } from "react-dom/client";

function Dashboard() {
  return <div>CyberAi Dashboard</div>;
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
);

import React from "react";
import { createRoot } from "react-dom/client";

function Dashboard() {
  return <div>CyberAi Dashboard</div>;
}

if (typeof document !== "undefined") {
  const rootElement = document.getElementById("root");
  if (rootElement) {
   createRoot(rootElement).render(
     <React.StrictMode>
       <Dashboard />
     </React.StrictMode>
   );
  }
}

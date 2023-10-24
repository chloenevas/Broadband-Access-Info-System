import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/App";

// Finds the root element and starts rendering React there.
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// Render starting with the App components.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

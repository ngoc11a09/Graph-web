import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "@xyflow/react/dist/style.css";

import "./index.css";
import "./output.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "@xyflow/react/dist/style.css";

import "./index.css";
import "./output.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

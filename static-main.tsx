import React from "react";
import { createRoot } from "react-dom/client";
import { StyleLabRoot } from "./app/StyleLabRoot";
import "./app/globals.css";
import "./app/style-lab.css";
import "./app/styles/lab-progressive.css";
import "./app/styles/studio.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyleLabRoot />
  </React.StrictMode>,
);

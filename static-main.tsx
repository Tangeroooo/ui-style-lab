import React from "react";
import { createRoot } from "react-dom/client";
import { StyleLab } from "./app/StyleLab";
import "./app/globals.css";
import "./app/style-lab.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyleLab />
  </React.StrictMode>,
);

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Pattern from "./examples/pattern/pattern";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Pattern/>
  </StrictMode>,
);

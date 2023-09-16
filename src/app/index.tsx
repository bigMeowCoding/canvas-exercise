import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Pattern from "./examples/pattern/pattern";
import Shadow from "./examples/shadow";

const rootEl = document.getElementById("root") as HTMLElement;
const root = createRoot(rootEl);

root.render(
  <StrictMode>
    {/*<Pattern />*/}
    <Shadow />
  </StrictMode>,
);

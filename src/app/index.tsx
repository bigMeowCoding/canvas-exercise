import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Pattern from "./examples/pattern/pattern";
import Shadow from "./examples/shadow";
import Line from "./examples/line";
import GridDemo from "./examples/grid";

const rootEl = document.getElementById("root") as HTMLElement;
const root = createRoot(rootEl);

root.render(
  <StrictMode>
    {/*<Pattern />*/}
    {/*<Line />*/}
    <GridDemo />
  </StrictMode>,
);

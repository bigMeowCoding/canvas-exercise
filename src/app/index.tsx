import React, { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Pattern from "./examples/pattern/pattern";
import Shadow from "./examples/shadow";
import Line from "./examples/line";
import GridDemo from "./examples/grid";
import CreateImage from "./examples/createImage";
import Bigwheel from "./examples/bigwheel";
import BigwheelDemo from "./examples/bigwheel";
import Demo from "./demo";

const rootEl = document.getElementById("root") as HTMLElement;
const root = createRoot(rootEl);

root.render(
  <StrictMode>
    {/*<Pattern />*/}
    {/*<CreateImage/>*/}
    {/*<Line />*/}
    <Demo />

    {/*<GridDemo />*/}
  </StrictMode>,
);

import { drawArrow, drawRect, getCanvasBase } from "./utils";

export function baseDraw() {
  const { context } = getCanvasBase();
  if (!context) {
    return;
  }
  // drawArrow(context);
  drawRect(context, 100, 100, 200, 200, 10, "#ddd", "red");
}

import {
  drawArrow,
  drawRect,
  drawStar,
  drawStarSky,
  fillMoon,
  fillRoundRect,
  getCanvasBase,
  strokeRoundRect,
} from "./utils";

export function baseDraw() {
  const { context } = getCanvasBase();
  if (!context) {
    return;
  }
  drawStarSky(200);
  fillMoon(context, 2, 600, 200, 100, 0);
  // strokeRoundRect(
  //   context,
  //   { x: 10, y: 10 },
  //   {
  //     width: 200,
  //     height: 200,
  //     radius: 20,
  //   }
  // );
  // fillRoundRect(
  //   context,
  //   { x: 200, y: 200 },
  //   {
  //     width: 200,
  //     height: 200,
  //     radius: 20,
  //   },
  //   {
  //     fillStyle: "pink",
  //   }
  // );
}

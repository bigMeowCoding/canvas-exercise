import { drawArrow, drawRect, drawStar, getCanvasBase } from "./utils";

function drawStarSky(count: number) {
  const { context, canvas } = getCanvasBase();
  if (!context) {
    return;
  }
  const skyStyle = context.createLinearGradient(0, 0, 0, canvas.height);
  skyStyle.addColorStop(0, "black");
  skyStyle.addColorStop(1.0, "#035");
  context.fillStyle = skyStyle;
  context.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < count; i++) {
    const rot = 360 * Math.random(),
      x = canvas.width * Math.random(),
      y = canvas.height * 0.65 * Math.random(),
      r = Math.random() * 10 + 10;
    drawStar(
      context,
      {
        x,
        y,
        rot,
      },
      { inner: r / 2, outer: r },
      { fillStyle: "yellow" }
    );
  }
}

export function baseDraw() {
  const { context } = getCanvasBase();
  if (!context) {
    return;
  }
  drawStarSky(200);
}

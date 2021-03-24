import { getCanvasBase } from "./utils";
import { DIGIT } from "./digit";

const WINDOW_WIDTH = 1024,
  WINDOW_HEIGHT = 768,
  RADIUS = 8,
  MARGIN_TOP = 60,
  MARGIN_LEFT = 30;

function render(cxt: CanvasRenderingContext2D) {
  var hours = 12;
  var minutes = 34;
  var seconds = 56;
  renderDigit(MARGIN_LEFT, MARGIN_TOP, Math.floor(hours / 10), cxt);
  renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, hours % 10, cxt);
  renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
  renderDigit(
    MARGIN_LEFT + 39 * (RADIUS + 1),
    MARGIN_TOP,
    Math.floor(minutes / 10),
    cxt
  );
  renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, minutes % 10, cxt);
  renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
  renderDigit(
    MARGIN_LEFT + 78 * (RADIUS + 1),
    MARGIN_TOP,
    Math.floor(seconds / 10),
    cxt
  );
  renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, seconds % 10, cxt);
}

function renderDigit(
  x: number,
  y: number,
  num: number,
  cxt: CanvasRenderingContext2D
) {
  cxt.fillStyle = "rgb(0,102,153)";

  for (var i = 0; i < DIGIT[num].length; i++)
    for (var j = 0; j < DIGIT[num][i].length; j++)
      if (DIGIT[num][i][j] == 1) {
        cxt.beginPath();
        cxt.arc(
          x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
          y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
          RADIUS,
          0,
          2 * Math.PI
        );
        cxt.closePath();

        cxt.fill();
      }
}
export function countDown() {
  window.onload = function () {
    const { context, canvas } = getCanvasBase();
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    if (!context) {
      return;
    }
    render(context);
  };
}

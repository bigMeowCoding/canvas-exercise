import { getCanvasBase } from "./utils";
import { DIGIT } from "./digit";
interface Ball {
  x: number;
  y: number;
  color: string;
  g: number;
  vx: number;
  vy: number;
}
const colors = [
  "#33B5E5",
  "#0099CC",
  "#AA66CC",
  "#9933CC",
  "#99CC00",
  "#669900",
  "#FFBB33",
  "#FF8800",
  "#FF4444",
  "#CC0000",
];
let WINDOW_WIDTH = 1024,
  WINDOW_HEIGHT = 768,
  RADIUS = 8,
  MARGIN_TOP = 60,
  MARGIN_LEFT = 30,
  endTime = new Date(2021, 2, 26, 23, 59, 59);
let currentRestSeconds = 0;
const balls: Ball[] = [];
function getRestTimeSeconds(): number {
  const endTimes = endTime.getTime(),
    nowTimes = new Date().getTime();
  const rest = Math.floor((endTimes - nowTimes) / 1000);
  return rest > 0 ? rest : 0;
}

function renderBall(cxt: CanvasRenderingContext2D) {
  for (let i = 0; i < balls.length; i++) {
    cxt.fillStyle = balls[i].color;

    cxt.beginPath();
    cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
    cxt.closePath();

    cxt.fill();
  }
}

function render(cxt: CanvasRenderingContext2D) {
  cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
  const hours = Math.floor(currentRestSeconds / 3600),
    minutes = Math.floor((currentRestSeconds - hours * 3600) / 60),
    seconds = (currentRestSeconds - hours * 3600) % 60;

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
  renderBall(cxt);
}
function addBalls(x: number, y: number, num: number) {
  for (let i = 0; i < DIGIT[num].length; i++) {
    for (let j = 0; j < DIGIT[num][i].length; j++) {
      if (DIGIT[num][i][j] === 1) {
        balls.push({
          x: x + j * 2 * (RADIUS + 1) + RADIUS + 1,
          y: y + i * 2 * (RADIUS + 1) + RADIUS + 1,
          g: 1.5 + Math.random(),
          vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
          vy: -5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }
  }
}

function renderDigit(
  x: number,
  y: number,
  num: number,
  cxt: CanvasRenderingContext2D
) {
  cxt.fillStyle = "rgb(0,102,153)";
  for (let i = 0; i < DIGIT[num].length; i++)
    for (let j = 0; j < DIGIT[num][i].length; j++)
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

function update() {
  const nextRestTImeSeconds = getRestTimeSeconds();
  const nextHours = Math.floor(nextRestTImeSeconds / 3600),
    nextMinutes = Math.floor((nextRestTImeSeconds - nextHours * 3600) / 60),
    nextSeconds = (nextRestTImeSeconds - nextHours * 3600) % 60;
  const hours = Math.floor(currentRestSeconds / 3600),
    minutes = Math.floor((currentRestSeconds - hours * 3600) / 60),
    seconds = (currentRestSeconds - hours * 3600) % 60;
  if (nextSeconds !== seconds) {
    if (Math.floor(hours / 10) != Math.floor(nextHours / 10)) {
      addBalls(MARGIN_LEFT, MARGIN_TOP, Math.floor(hours / 10));
    }
    if (Math.floor(hours % 10) != Math.floor(nextHours % 10)) {
      addBalls(
        MARGIN_LEFT + 15 * (RADIUS + 1),
        MARGIN_TOP,
        Math.floor(hours % 10)
      );
    }

    if (Math.floor(minutes / 10) != Math.floor(nextMinutes / 10)) {
      addBalls(
        MARGIN_LEFT + 39 * (RADIUS + 1),
        MARGIN_TOP,
        Math.floor(minutes / 10)
      );
    }
    if (Math.floor(minutes % 10) != Math.floor(nextMinutes % 10)) {
      addBalls(
        MARGIN_LEFT + 54 * (RADIUS + 1),
        MARGIN_TOP,
        Math.floor(minutes % 10)
      );
    }

    if (Math.floor(seconds / 10) != Math.floor(nextSeconds / 10)) {
      addBalls(
        MARGIN_LEFT + 78 * (RADIUS + 1),
        MARGIN_TOP,
        Math.floor(seconds / 10)
      );
    }
    if (Math.floor(seconds % 10) != Math.floor(nextSeconds % 10)) {
      addBalls(
        MARGIN_LEFT + 93 * (RADIUS + 1),
        MARGIN_TOP,
        Math.floor(seconds % 10)
      );
    }
    currentRestSeconds = nextRestTImeSeconds;
  }
  updateBalls();
}

/**
 * @description 使用cursor将画布展示中的小球放在数组前边，当游标小于数组长度表明有可以删除的小球那就从后开始执行
 */
function removeBallOutCanvas() {
  let cursor = 0;
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH)
      balls[cursor++] = balls[i];
  }

  while (balls.length > cursor) {
    balls.pop();
  }
}

function updateBalls() {
  for (let i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;

    if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
      balls[i].y = WINDOW_HEIGHT - RADIUS;
      balls[i].vy = -balls[i].vy * 0.75;
    }
  }
  removeBallOutCanvas();
}
export function countDown() {
  window.onload = function () {
    const { context, canvas } = getCanvasBase();
    WINDOW_HEIGHT = document.body.clientHeight;
    WINDOW_WIDTH = document.body.clientWidth;
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
    RADIUS = Math.round((WINDOW_WIDTH * 4) / 5 / 108) - 1;
    if (!context) {
      return;
    }
    currentRestSeconds = getRestTimeSeconds();
    setInterval(() => {
      render(context);
      update();
    }, 50);
  };
}

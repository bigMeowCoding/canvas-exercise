/**
 * @description 小球壁纸效果实现
 */
import getRandomInt from "./common/getRandomInt";
import getRandomColor from "./common/getRandomColor";


const canvas = document.getElementById("canvas") as HTMLCanvasElement,
  context = canvas.getContext("2d");
const btn = document.getElementById("startButton");
let timer: number | null = null;

btn &&
  btn.addEventListener("click", () => {
    if (timer) {
      cancelAnimationFrame(timer);
      timer = null;
    } else {
      draw();
    }
    setBtnText();
  });

function setBtnText() {
  if (!btn) {
    return;
  }
  if (timer) {
    btn.innerText = "stop";
  } else {
    btn.innerText = "start";
  }
}

const nums = 100;

interface IBall {
  x: number;
  y: number;
  color: string;
  radius: number;
  vx?: number;
  vy?: number;
}

const balls: IBall[] = [];
function makeBallPos(radius: number) {
  let x = getRandomInt(0, canvas.width);
  let y = getRandomInt(0, canvas.height);
  if (x - radius < 0) {
    x = radius;
  }
  if (x + radius > canvas.width) {
    x = canvas.width - radius;
  }

  if (y - radius < 0) {
    y = radius;
  }
  if (y + radius > canvas.height) {
    y = canvas.height - radius;
  }
  return {
    x,
    y,
  };
}

function makeBallAttr() {
  const radius = getRandomInt(30, 50);
  const { x, y } = makeBallPos(radius);
  const color = getRandomColor();
  const ret: IBall = { radius, x, y, color };

  const v = getRandomInt(5, 10);
  if (Math.random() > 0.5) {
    ret.vx = v;
    if (Math.random() < 0.5 && ret.vx) {
      ret.vx = ret.vx - 1;
    }
  } else {
    ret.vy = v;
    if (Math.random() < 0.5 && ret.vy) {
      ret.vy *= -1;
    }
  }
  return ret;
}

function drawBall(i: number) {
  if (!context) {
    return;
  }
  context.save();
  context.beginPath();
  const { x, y, radius, color } = balls[i];
  context.fillStyle = color;
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

function moveBall(i: number) {
  const ball = balls[i];
  if (ball.vy) {
    ball.y += ball.vy;
    if (ball.y - ball.radius <= 0) {
      ball.y = ball.radius;
      ball.vy = ball.vy * -1;
    } else if (ball.y > canvas.height - ball.radius) {
      ball.y = canvas.height - ball.radius;
      ball.vy = ball.vy * -1;
    }
  } else {
    ball.x += ball.vx ?? 0;
    if (ball.x - ball.radius <= 0) {
      ball.x = ball.radius;
      if (ball.vx) {
        ball.vx = ball.vx * -1;
      }
    } else if (ball.x > canvas.width - ball.radius) {
      ball.x = canvas.width - ball.radius;
      if (ball.vx) {
        ball.vx = ball.vx * -1;
      }
    }
  }
}

function draw() {
  context?.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < balls.length; i++) {
    drawBall(i);
    moveBall(i);
  }
  timer = requestAnimationFrame(draw);
}

function start() {
  for (let i = 0; i < nums; i++) {
    balls.push(makeBallAttr());
  }
  draw();
  setBtnText();
}

start();

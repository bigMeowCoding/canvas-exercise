import { getCanvasBase } from "./utils";
import { Ball } from "./types";

export function run() {
  window.onload = function () {
    const { context, canvas } = getCanvasBase();
    const balls: Ball[] = [];

    if (!context) {
      return;
    }

    function draw(context: CanvasRenderingContext2D) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalAlpha = 0.7;
      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        context.beginPath();
        context.globalCompositeOperation = 'lighter'
        context.fillStyle = ball.color;
        context.arc(ball.x, ball.y, ball.r || 0, 0, Math.PI * 2);
        context.fill();
      }
    }

    function update() {
      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i],
          radius = ball.r || 0;
        ball.x = ball.x + ball.vx;
        ball.y = ball.y + ball.vy;
        if (ball.x - radius <= 0) {
          ball.x = radius;
        }
        if (ball.x + radius >= canvas.width) {
          ball.x = canvas.width - radius;
        }
        if (ball.y - radius <= 0) {
          ball.y = radius;
        }
        if (ball.y + radius >= canvas.height) {
          ball.y = canvas.height - radius;
        }
        ball.vx =
            ball.x + radius >= canvas.width || ball.x - radius <= 0
                ? -ball.vx
                : ball.vx;
        ball.vy =
          ball.y - radius <= 0 || ball.y + radius >= canvas.height
            ? -ball.vy
            : ball.vy;
      }
    }

    function initBalls() {
      for (let i = 0; i < 100; i++) {
        const R = Math.floor(Math.random() * 255),
          G = Math.floor(Math.random() * 255),
          B = Math.floor(Math.random() * 255);
        balls.push({
          color: `rgb(${R},${G},${B})`,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 60,
          vx:
            (Math.random() * 5 + 5) *
            Math.pow(-1, Math.floor(Math.random() * 100)),
          vy:
            (Math.random() * 5 + 5) *
            Math.pow(-1, Math.floor(Math.random() * 100)),
        });
      }
    }

    initBalls();
    setInterval(() => {
      draw(context);
      update();
    }, 50);
  };
}

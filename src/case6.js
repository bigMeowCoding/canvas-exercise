/**
 * @description 画大转盘
 */
import getRandomColor from "./common/getRandomColor";
import getRandomInt from "./common/getRandomInt";
import isInCenterCircle from "./common/isInCenterCircle";

const options = {
  radius: 100,
  angle: 0,
  status: 1,
  accSpeed: 0.3,
  decSpeed: -0.1,
  speed: 0,
  maxSpeed: 1,
  minSpeed: 0.1,
  count: 8,
  des: 0,
};

options.decTime = (options.maxSpeed - options.minSpeed) / options.decSpeed;
options.decPath =
  (options.maxSpeed * options.decTime +
    0.5 * options.decSpeed * options.decTime * options.decTime) %
  360;

const colors = new Array(options.count).fill(0).map(() => getRandomColor());
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const centerCircleRadius = 20;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const pos = { x: canvasWidth / 2, y: canvasHeight / 2 };

function drawBigwheel() {
  const drawCount = 8;
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.translate(pos.x, pos.y);
  let angle = options.angle;
  // ctx.rotate(angle);

  for (let i = 0; i < drawCount; i++) {
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.arc(
      pos.x,
      pos.y,
      options.radius,
      angle + -Math.PI / 2,
      angle + -Math.PI / 2 + (2 * Math.PI) / drawCount,
    );

    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.closePath();

    ctx.save();
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const textAngle = angle + -Math.PI / 2 + (1 / 8) * Math.PI;
    ctx.fillText(
      i + 1,
      pos.x + options.radius * 0.5 * Math.cos(textAngle),
      pos.y + options.radius * 0.5 * Math.sin(textAngle),
    );
    ctx.restore();

    angle += (Math.PI * 2) / drawCount;
  }
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, centerCircleRadius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
}
function spinWheel() {
  let angle = options.angle;
  const status = options.status;
  let targetAngle = options.des;
  // targetAngle = (360 - options.decPath - targetAngle) % 360;

  let speed = options.speed;
  if (status === 1) {
    speed += options.accSpeed;
    if (speed > options.maxSpeed) {
      speed = options.maxSpeed;
      options.status = 0;
    }
  } else if (status === -1) {
    speed += options.decSpeed;
    if (speed < options.minSpeed) {
      speed = options.minSpeed;
    }
  }

  angle += speed;
  angle = angle % (Math.PI * 2);

  if (options.status === 0 && angle - targetAngle < options.maxSpeed) {
    options.status = -1;
  }

  options.angle = angle;
  options.speed = speed;
  console.log(status, speed, angle, targetAngle);
  // 停止旋转条件
  if (
    options.speed <= options.minSpeed &&
    Math.abs(options.angle - targetAngle) <= 0.01
  ) {
    return; // 停止旋转
  }

  drawBigwheel();
  // console.log("spinWheel", angle, options.speed);
  // 减速旋转
  // options.speed = options.speed - 0.001 > 0 ? options.speed - 0.001 : 0; // 可根据需要调整减速度

  requestAnimationFrame(spinWheel);
}

canvas.addEventListener("click", (e) => {
  const { clientX, clientY } = e;
  if (isInCenterCircle(clientX, clientY, centerCircleRadius, pos)) {
    const index = getRandomInt(1, 8);
    console.log("index", index);
    options.des =
      2 * Math.PI - (((index - 1) * 2 * Math.PI) / 8 + (2 * Math.PI) / 16);
    spinWheel();
  }
});
drawBigwheel();

// spinWheel();

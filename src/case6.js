/**
 * @description 画大转盘
 */
import getRandomColor from "./common/getRandomColor";

const options = { radius: 100, angle: 0, speed: 0.1, count: 8 };
const colors = new Array(options.count).fill(0).map(() => getRandomColor());
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const centerCircleRadius = 20;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const pos = { x: canvasWidth / 2, y: canvasHeight / 2 };
const friction = 0.998; // 摩擦系数，越接近1，减速越慢

let targetSegment = 5;
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
    console.log(
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
  angle = angle % (Math.PI * 2);

  const targetAngle =
    2 * Math.PI - ((2 * Math.PI) / options.count) * targetSegment;
  const distanceToTarget = Math.abs(targetAngle - angle);
  let speed = options.speed;
  speed = speed * friction;
  if (speed < 0.005 && distanceToTarget < 0.05) {
    speed *= 0.95; // 更大的摩擦
  }
  angle += speed;
  // 停止旋转条件
  if (options.speed < 0.0001 && distanceToTarget < 0.005) {
    options.angle = targetAngle;
    options.speed = 0;
    return; // 停止旋转
  }
  options.angle = angle;
  options.speed = speed;
  drawBigwheel();
  console.log("spinWheel", angle, options.speed, distanceToTarget);
  // 减速旋转
  // options.speed = options.speed - 0.001 > 0 ? options.speed - 0.001 : 0; // 可根据需要调整减速度

  requestAnimationFrame(spinWheel);
}
function isInCenterCircle(x, y) {
  const { x: centerX, y: centerY } = pos;
  const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
  return distance <= centerCircleRadius;
}
canvas.addEventListener("click", (e) => {
  const { clientX, clientY } = e;
  if (isInCenterCircle(clientX, clientY)) {
    spinWheel();
  }
});
drawBigwheel();

// spinWheel();
